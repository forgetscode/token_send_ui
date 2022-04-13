import React from 'react';
import { Formik, Form, Field } from "formik";
import { CreateWorkspace } from './CreateWorkspace';
import * as anchor from '@project-serum/anchor';
import { PublicKey, Transaction } from '@solana/web3.js';
import { loaderNotification, txNotification, errorNotification } from './utils';
import { getAssociatedTokenAddress, createAssociatedTokenAccountInstruction } from '@solana/spl-token';
const { TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID} = require("@solana/spl-token");

export const SendToken= () => {
    const workspace = CreateWorkspace();
    if (workspace) {
        return (
            <>
            <h1 className="font-semibold text-lg mb-2">Send Token</h1>
            <Formik
                initialValues={{address:"", amount:"", token:""}}
                onSubmit={async (values) => {
                    const amount = await new anchor.BN(parseFloat(values.amount) * (1000000000));
                    const receiver = await new PublicKey(values.address);
                    const mintA = await new PublicKey(values.token);
                    const associatedTokenProgramId = ASSOCIATED_TOKEN_PROGRAM_ID;
                    loaderNotification();
                    try{

                        
                        const response_from = await workspace.connection.getParsedTokenAccountsByOwner(workspace.wallet.publicKey!, { programId: TOKEN_PROGRAM_ID });

                        const found_from = response_from.value.find(element => element.account.data.parsed.info.mint == values.token);

                        const TokenAccountA = found_from!.pubkey

                        

                        const response_to = await workspace.connection.getParsedTokenAccountsByOwner(receiver, { programId: TOKEN_PROGRAM_ID });

                        const found_to = response_to.value.find(element => element.account.data.parsed.info.mint == values.token);

                        let TokenAccountB = null;

                        console.log("t");

                        if(!found_to){
                            const associatedToken = await getAssociatedTokenAddress(mintA, receiver, false, TOKEN_PROGRAM_ID, associatedTokenProgramId);

                            const transaction = new Transaction().add(
                                createAssociatedTokenAccountInstruction(
                                    workspace.wallet.publicKey!,
                                    associatedToken,
                                    receiver,
                                    mintA,
                                    TOKEN_PROGRAM_ID,
                                    associatedTokenProgramId
                                )
                            );
                            TokenAccountB = associatedToken;

                            const tx = await workspace.program.methods.proxyTransfer(amount).accounts({
                                sender: workspace.wallet.publicKey!,
                                mint: mintA,
                                from: TokenAccountA,
                                to: TokenAccountB,
                                tokenProgram: TOKEN_PROGRAM_ID,
                            }
                            ).transaction();

                        

                            transaction.add(
                                tx
                            )

                            const result = await workspace.program.provider.send( transaction, []);

                            const confirmation = await workspace.connection.confirmTransaction(result, 'processed');
                            if(!confirmation.value.err){
                                txNotification("success!");
                            }
                            else{
                                errorNotification("Error", "Transaction was rejected");
                            }

                        }
                        else{
                            TokenAccountB = found_to!.pubkey;
                                
                            const tx = await workspace.program.methods.proxyTransfer(amount).accounts({
                                sender: workspace.wallet.publicKey!,
                                mint: mintA,
                                from: TokenAccountA,
                                to: TokenAccountB,
                                tokenProgram: TOKEN_PROGRAM_ID,
                                }
                            ).rpc();

                            const confirmation = await workspace.connection.confirmTransaction(tx, 'processed');
                            if(!confirmation.value.err){
                                txNotification(tx);
                            }
                            else{
                                errorNotification("Error", "Transaction was rejected");
                            }
                        }
                    
                    }
                    catch(err:any){
                        if (err.toString().includes("0x1")){
                            errorNotification("Transaction cancelled", "Insufficient funds");
                        }
                        else if (err.toString().includes("User rejected the request.")){
                            errorNotification("Transaction cancelled", "");
                        }
                        else{   
                            errorNotification("Transaction cancelled", err);
                        }
                    }
                }}
            >
                {({ values, isSubmitting }) => (
                        <div className="w-f md:border border-slate-600 rounded-lg p-4 bg-white">
                            <Form>
                                        <div className="flex flex-row">
                                            <Field
                                                className=" p-3 border rounded-sm border-slate-500"
                                                placeholder='Address'
                                                name='address'
                                                label='address'
                                            />
                                            <Field
                                                className=" p-3 border rounded-sm border-slate-500"
                                                placeholder='Amount'
                                                name='amount'
                                                label='amount'
                                            />
                                            <Field
                                                className=" p-3 border rounded-sm border-slate-500"
                                                placeholder='Token'
                                                name='token'
                                                label='token'
                                            />
                                        <button className="ml-auto text-white bg-emerald-700 hover:bg-emerald-800 
                                        focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-base px-6 py-3.5 text-center 
                                        dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800 mt-2 border-2 border-slate-800 "
                                            type="submit"
                                        >
                                            submit
                                        </button>
                                        </div>
                            </Form>
                        </div>
                )}
                </Formik>
                </>
        );
    
    }
    return(
        <>
        </>
    );
}
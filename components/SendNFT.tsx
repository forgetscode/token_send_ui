import React from 'react';
import { Formik, Form, Field } from "formik";
import { CreateWorkspace } from './CreateWorkspace';
import * as anchor from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';
import { loaderNotification, txNotification, errorNotification } from './utils';
const { TOKEN_PROGRAM_ID, Token } = require("@solana/spl-token");

export const SendNFT= () => {
    const workspace = CreateWorkspace();
    if (workspace) {
        return (
            <>
            <h1 className="font-semibold text-lg mb-2">Send NFT</h1>
            <Formik
                initialValues={{address:"", token:""}}
                onSubmit={async (values) => {
                    console.log(values.address, values.address);
                    const amount = await new anchor.BN(1 * (1000000000));
                    const receiver = await new PublicKey(values.address);
                    const mintA = await new PublicKey(values.token);
                    loaderNotification();
                    try{
                        
                        const response_from = await workspace.connection.getParsedTokenAccountsByOwner(workspace.wallet.publicKey!, { programId: TOKEN_PROGRAM_ID });

                        const found_from = response_from.value.find(element => element.account.data.parsed.info.mint == values.token);

                        const TokenAccountA = found_from!.pubkey

                        const response_to = await workspace.connection.getParsedTokenAccountsByOwner(receiver, { programId: TOKEN_PROGRAM_ID });
                        const found_to = response_to.value.find(element => element.account.data.parsed.info.mint == values.token);
                        const TokenAccountB = found_to!.pubkey;
                        

                        console.log("receiver token acc", TokenAccountB.toBase58());

                        const tx = await workspace.program.rpc.proxyTransfer( amount, {
                            accounts: {
                                sender: workspace.wallet.publicKey!,
                                mint: mintA,
                                from: TokenAccountA,
                                to: TokenAccountB,
                                tokenProgram: TOKEN_PROGRAM_ID,
                            }
                            });

                        const confirmation = await workspace.connection.confirmTransaction(tx, 'processed');
                        if(!confirmation.value.err){
                            txNotification(tx);
                        }
                        else{
                            errorNotification("Error", "Transaction was rejected");
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
                            errorNotification("Transaction cancelled", "Receiver does not have a token account with the specified mint to send to");
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
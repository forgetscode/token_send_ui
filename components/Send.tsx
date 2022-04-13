import React from 'react';
import { Formik, Form, Field } from "formik";
import { CreateWorkspace } from './CreateWorkspace';
import * as anchor from '@project-serum/anchor';
import { PublicKey} from "@solana/web3.js";
import { errorNotification, loaderNotification, txNotification } from './utils';

export const Send= () => {
    const workspace = CreateWorkspace();
    if (workspace) {
        return (
            <>
            <h1 className="font-semibold text-lg mb-2">Send Sol</h1>
            <Formik
                initialValues={{address:"", amount:""}}
                onSubmit={async (values) => {
                    console.log(values.address, values.amount);
                    const amount = await new anchor.BN(parseFloat(values.amount)* (1000000000));
                    const receiver = await new PublicKey(values.address);
                    loaderNotification();
                    try{

                        const tx = await workspace.program.rpc.sendSol( amount, {
                            accounts: {
                                sender: workspace.wallet.publicKey!,
                                receiver: receiver,
                                systemProgram: anchor.web3.SystemProgram.programId,
                            }
                            });
                            console.log("Your transaction signature", tx);

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
                            errorNotification("Transaction cancelled", err.toString());
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
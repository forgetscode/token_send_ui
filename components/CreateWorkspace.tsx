import { PublicKey, clusterApiUrl, Connection } from "@solana/web3.js";
import * as anchor from '@project-serum/anchor';
import idl from '../idl/test_drive.json';
import { TestDrive } from '../idl/types/test_drive';
import { useWallet, WalletContextState } from "@solana/wallet-adapter-react";

type Workspace =  {
    wallet: WalletContextState;
    programID: PublicKey;
    network: string;
    connection: Connection;
    provider: anchor.Provider;
    program: anchor.Program<TestDrive>;
}

export const CreateWorkspace = () => {
    const wallet = useWallet();
    const programID = new PublicKey(idl.metadata.address);              
    const network = clusterApiUrl('devnet');
    const connection = new Connection(network, "processed");
    const provider = new anchor.Provider(connection, wallet as any, "processed" as any);
    const program = new anchor.Program<TestDrive>(idl as any, programID, provider);
    const WorkspaceObject = {wallet, programID, network, connection, provider, program}
    return WorkspaceObject;
}

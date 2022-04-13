import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import React from 'react';

export const Nav= ({children}:any) => {

    return (
        <div className="w-[100%]">
            <div className="max-w-7xl mx-auto px-4 mb-4">
              <div className="flex items-center justify-between h-16 ">
                <div className="mt-2 ml-auto">
                <WalletMultiButton  className="bg-violet-800 hover:bg-slate-900 rounded-sm text-white"/>
                </div>
              </div>
            </div>
          <div className="sm:bg-zinc-100 min-h-screen">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    {children}
            </div>
            </div>
        </div>
      );
}
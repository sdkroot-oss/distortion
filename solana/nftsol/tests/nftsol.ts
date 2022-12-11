import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Nftsol } from "../target/types/nftsol";
const { SystemProgram } = anchor.web3;
import * as chai from "chai"

var assert = chai.assert;

describe("nftsol", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Nftsol as Program<Nftsol>;
  const baseAccount = anchor.web3.Keypair.generate();

  it("Is initialized!", async () => {
    // Add your test here.
    let tx = await program.rpc.initialize({
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount],
    });

    console.log("Your transaction signature", tx);

    let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    assert.equal(account.totalGifs, 0)
    console.log('👀 GIF Count', account.totalGifs.toString())

    tx = await program.rpc.addGifs({
      accounts: {
        baseAccount: baseAccount.publicKey,
      },
    });

    account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    assert.equal(account.totalGifs, 1)
    console.log('👀 GIF Count', account.totalGifs.toString())
  });
});

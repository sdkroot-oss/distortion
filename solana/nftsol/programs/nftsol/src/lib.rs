use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod nftsol {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let base_account = &mut ctx.accounts.base_account;

        base_account.total_gifs = 0;
        Ok(())
    }

    pub fn add_gifs(ctx: Context<AddGifs>) -> Result<()> {
        let base_account = &mut ctx.accounts.base_account;

        base_account.total_gifs += 1;
        Ok(())
    }
}

#[account]
pub struct BaseAccount {
    pub total_gifs: u64,
} 

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 9000)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program <'info, System>,
}

#[derive(Accounts)]
pub struct AddGifs<'info> {
  #[account(mut)]
  pub base_account: Account<'info, BaseAccount>,
}
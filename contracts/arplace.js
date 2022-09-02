export function handle(state, action){
    if (action.input.function === 'Twitter') {
        state.twitter = true;
      }
      if (action.input.function === 'ArWallet') {
        state.arWallet = true;
      }
    
      if (action.input.function === 'arVerify') {
        state.arVerify = true
      }
      if (state.twitter && state.arVerify && wallet) {
        state.mintNft = true;
      }
      return mintNFt; 
    }
    
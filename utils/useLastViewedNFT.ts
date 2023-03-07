import { createGlobalState } from 'react-hooks-global-state'

const initialState = { nftToScrollTo: null }
const { useGlobalState } = createGlobalState(initialState)

export const useLastViewedNFT = () => {
  return useGlobalState('nftToScrollTo')
}

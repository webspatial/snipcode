import { Dispatch, createContext, ReactNode, useReducer } from 'react'

type MovieInfo = {
  id: number
  title: string
  desc: string
}

type MovieState = {
  open: boolean
  type: 'open' | 'close'
  movies: MovieInfo[]
  openMovieId?: number
  callback?: () => void,
}

const initialState: MovieState = {
  open: false,
  type: 'close',
  movies: [{
    id: 1,
    title: 'The Shawshank Redemption',
    desc: 'This film tells the story of Andy Dufresne, a banker wrongly convicted of murder, who endures life in Shawshank Prison. Through resilience, friendship, and quiet determination, he orchestrates an extraordinary escape while inspiring hope in his fellow inmates. A profound tale of redemption and the human spirit',
  }, {
    id: 2,
    title: 'Forrest Gump',
    desc: 'The life of Forrest Gump, a man with a low IQ but boundless optimism, unfolds against the backdrop of 20th-century American history. From football stardom to Vietnam heroism, his journey intertwines with historical events and his lifelong love for Jenny. A heartwarming blend of humor, tragedy, and nostalgia',
  }],
  openMovieId: undefined,
}


type MovieAction = {
  type: 'open'
  openMovieId: number
} | {
  type: 'close'
}

type MovieContextType = {
  state: MovieState
  dispatch: Dispatch<MovieAction>
}

export const AppContext = createContext<MovieContextType>(
  {} as MovieContextType,
)

function movieReducer(state: MovieState, action: MovieAction): MovieState {
  switch (action.type) {
    case 'open': {
      return {
        ...state,
        open: true,
        openMovieId: action.openMovieId,
        type: 'open',
      }
    }
    case 'close': {
      return {
        ...state,
        open: false,
        openMovieId: -1,
        type: 'open',
      }
    }

    default: {
      return state
    }
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(movieReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

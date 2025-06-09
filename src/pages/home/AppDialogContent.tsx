import {
  useContext,
  CSSProperties,
  useRef,
  useState,
  useEffect,
} from 'react'

import { AppContext } from './AppContext'

import { Tween, Group, Easing } from '@tweenjs/tween.js'
const group = new Group()

requestAnimationFrame(function loop(time) {
  group.update(time)
  requestAnimationFrame(loop)
})

export function AppDialogContent() {
  const { state, dispatch } = useContext(AppContext)

  console.log('AppDialogContent state', state)

  const open = state.open

  const movie = state.movies.find(movie => movie.id === state.openMovieId)

  const initialStyle = {
    '--xr-back': 0,
    'opacity': 0.5
  }
  const finalStyle = {
    '--xr-back': 16,
    'opacity': 1
  }
  const [style, setXRStyle] = useState<CSSProperties>(initialStyle);

  const tweenRef = useRef<Tween>(undefined)
  useEffect(() => {
    if (open) {
      console.log('open')
      const tween = new Tween(initialStyle)
        .to(finalStyle, 300)
        .easing(Easing.Linear.InOut)
        .onUpdate(o => {
          setXRStyle({ ...o })
        }).start()

      group.add(tween)
    } else {
      console.log('close')
      if (tweenRef.current) {
        group.remove(tweenRef.current)
        tweenRef.current?.remove()
        tweenRef.current = undefined
      }
    }
  }, [open])

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()

    const tween = new Tween(finalStyle)
      .to(initialStyle, 300)
      .easing(Easing.Linear.InOut)
      .onUpdate(o => {
        setXRStyle({ ...o })
      })
      .onComplete(() => {
        dispatch({ type: 'close' })
      })
      .start()

    group.add(tween)
  }



  return (open && <div
    style={style}
    enable-xr
    className='absolute top-0 left-0 w-full h-full flex justify-center items-center bg-blue-100/0'
    onClick={onClick}
  >
    <div className="bg-amber-100 w-1/2 h-1/2 flex-col justify-center p-[20px] ">
      <p> {movie?.title} </p>

      <p className='mt-[20px] text-amber-600'> {movie?.desc} </p>
    </div>
  </div >
  )
}

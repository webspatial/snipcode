import { useContext } from "react"
import { AppContext } from "./AppContext"

function MovieCard({ id, title }: { id: number, title: string }) {
    const { dispatch } = useContext(AppContext)

    const onMovieDetailDialog = () => {
        dispatch({
            type: 'open',
            openMovieId: id
        })
    }

    return <div onClick={onMovieDetailDialog} className="w-[100px] h-[100px] flex-col justify-between justify-items-center p-[4px] bg-blue-300 " >
        {title}
    </div>
}

export function MainContent() {
    const { state } = useContext(AppContext)
    return (
        <div className="p-[20px]">
            <p>This code is to demostrate how to use modal dialog</p>

            <div className="mt-[20px] w-[220px] h-[200px] grid grid-cols-2 gap-4">
                {state.movies.map(movie => {
                    return <MovieCard key={movie.id} {...movie} />
                })}

            </div>
        </div>
    )
}

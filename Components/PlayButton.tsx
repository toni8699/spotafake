
import {FaPlay} from "react-icons/fa"
const PlayButton = () => {
    return (
      <button className={'bg-blue-500 p-4 rounded-full flex items-center justify-center ' +
          'group-hover:opacity-100 opacity-0 transition hover:scale-110'}>
        <FaPlay />
      </button>
    )
}

export default PlayButton
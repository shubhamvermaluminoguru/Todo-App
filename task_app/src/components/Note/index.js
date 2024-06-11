import { motion } from "framer-motion"

const Note = (props) => {
    const {key, value, onClosePress} = props
    return (
    <div className='border-b p-2 text-start snap-start text-slate-600 flex justify-between items-center'
        key={key}
        >
        <span> {value}</span>    
        {/* <motion.img src='https://static-00.iconduck.com/assets.00/close-icon-2048x2047-22z7exfk.png' 
          className="size-2"
          onClick={onClosePress}/> */}
    </div>
    )
}

export default Note
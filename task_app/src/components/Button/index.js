import { motion, AnimatePresence } from "framer-motion"

const Button = (props) => {
    const {color, value, onClick} = props
    return (
        <motion.button className='w-20 bg-orange-900 rounded text-white'
            initial={{ opacity: 0.6 }}
            whileHover={{scale: 1.1,
                transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.9 }}
            whileInView={{ opacity: 1 }} onClick={onClick}>
                {value}
       </motion.button>
    )
}

export default Button
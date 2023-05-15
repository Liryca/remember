import hamburger from './images/hamburger.png';
import './Hamburger.css'

type Props = {
    open: boolean;
    setOpen: (v: boolean) => void;
};

export const Hamburger:React.FC<Props> = ({open,setOpen}) => {

    return (
        <div className='hamburger' onClick={()=>setOpen(!open)}><p className='hamburger__menu text'>menu</p>
        <img src={hamburger} alt='menu' />
    </div>
    )


}

import { useState, useEffect } from 'react';
import './Tab.css'

interface IProps {
  isSelected: boolean
  name: string
  select: () => void; // Add onClick as an optional prop
}
const Tab= ({isSelected, name, select}:IProps) => {
  
  const [selectedTabClass, setSelectedTabClass] = useState('');
  
  useEffect(()=>{
    if(isSelected) return setSelectedTabClass('tab_selected')
    setSelectedTabClass('tab_not_selected')
  },[isSelected])
  
  return (
    <>
      <div className={`tab_container ${selectedTabClass}`} onClick={()=>select()}>
         <span>{name}</span>
      </div>
    </>
  )
};

export default Tab;

import './index.less'
import DropDown from './DropDown'

export default ({sideBarData}) => {
  return (
    <div className='side-bar'>
      {sideBarData.map((sideBar, index) => {
        return (
          <div key={`${sideBar.title}-${index}`}>
            <DropDown sideBarList={sideBar} />
          </div>
        )
      })}
    </div>
  )
}

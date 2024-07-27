import style from './PopUp.module.scss'

const PopUp = ({ activePoint, SetPopUp, setActivePoint }) => {
	const ClosePopUp = () => {
		SetPopUp(false)
		setActivePoint(null)
	}

	return (
		<>
			<div className={style.blur}></div>
			<div className={style.popup_body}>
				<div className={style.popUp_navigation}>
					<div className={style.popUp_navigation_close} onClick={() => ClosePopUp()}>
						X
					</div>
				</div>
				<div className={style.popUp_content}>
					<iframe className={style.popUp_iframe} src={activePoint.link} title='popup' />
					<div className={style.popUp_description}>
						<span>{activePoint.description}</span>
					</div>
					<div className={style.popUp_tags}></div>
					<span>{activePoint.tags}</span>
				</div>
			</div>
		</>
	)
}

export default PopUp

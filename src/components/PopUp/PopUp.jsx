import style from './PopUp.module.scss'

const PopUp = ({ activePoint, SetPopUp, setActivePoint }) => {
	const ClosePopUp = () => {
		SetPopUp(false)
		setActivePoint(null)
	}

	const Redirect = (LinkTravel) => {
		window.open(LinkTravel, '_blank')
	}

	return (
		<>
			<div className={style.blur}></div>
			<div className={style.popup_body}>
				<div className={style.popUp_navigation}>
					<div
						className={style.popUp_navigation_close}
						onClick={() => ClosePopUp()}
					>
						X
					</div>
				</div>
				<div className={style.popUp_content}>
					{activePoint.name && (
						<h1 className={style.popUp_title}>{activePoint.name}</h1>
					)}
					<iframe
						className={style.popUp_iframe}
						src={activePoint.LinkImg}
						title='popup'
					/>
					{activePoint.description && (
						<div className={style.popUp_description}>
							<span>{activePoint.description}</span>
						</div>
					)}
					<div className={style.popUp_tags}>
						<span>{activePoint.Hashtag}</span>
					</div>
					{activePoint.LinkTravel && (
						<button
							className={style.popUp_button}
							onClick={() => Redirect(activePoint.LinkTravel)}
						>
							Открыть Yandex Travel
						</button>
					)}
				</div>
			</div>
		</>
	)
}

export default PopUp

import './Footer.css';

export default function Footer(props) {
	return (
		<footer className={props.isLoading?"footer fixed":"footer"}>
			Создано при помощи
			<a href="https://www.cbr-xml-daily.ru/" className="link">API для курсов ЦБ РФ</a>
		</footer>
	);
}

import './Header.css';

export default function Header() {
	return (
		<header className="header">
			<div className="header_box">
				<div className="titles">
					<h4>Код валюты</h4>
					<h4>Курс (р.)</h4>
					<h4>Разница</h4>
				</div>
			</div>
			<div className="under_titles"></div>
		</header>
	);
}

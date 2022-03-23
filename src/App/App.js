import React, { useState, useEffect, useCallback } from "react";

import Header from "../Components/Header/Header";
import MoneyList from "../Components/MoneyList/MoneyList";
import Loading from "../Components/Loading/Loading";
import Footer from "../Components/Footer/Footer";

import './App.css';

function App() {
	
	const [data, setData] = useState({money:{}, isLoading:true, error:false});
	
	async function getDateInfo(date_url,next_day){
		try {
			var response = await fetch(date_url||"https://www.cbr-xml-daily.ru/daily_json.js").then(response => response.json());
			if (!response.Valute) {
				throw new Error("Something went wrong!");
			}
			const dayData = response.Valute;
			
			const dailyData = {};
			for (const key in dayData) {
				let money_info = {
					charCode: dayData[key].CharCode,
					name: names[dayData[key].ID]||dayData[key].Name, //Поскольку сервер возвращает имена не в именительном падеже, необходимо брать имена из массива
					value: (dayData[key].Value/dayData[key].Nominal).toFixed(4),
				};
				dailyData[dayData[key].ID] = money_info;
				
				if(next_day&&next_day.values[dayData[key].ID]){ //если есть информация про следующий день, вычисляем процентную разницу
					next_day.values[dayData[key].ID].diff = (((next_day.values[dayData[key].ID].value - money_info.value) / money_info.value) * 100).toFixed(2); 
				}
			}
			
			return {
				date:response.Date,
				next_day:next_day,
				info:{
					values: dailyData,
					previousDate:response.PreviousDate,
					previousURL:response.PreviousURL
				}
			}
		} catch (error) {
			return {error:error}
		}
	}
	
	const getData = useCallback(async () => {			
		var money = {};
		let date_info = await getDateInfo();
		if(date_info.error) return setData({money:{}, error:date_info.error});
		
		let previous_date_info = await getDateInfo(date_info.info.previousURL,date_info.info); //поскольку previousValue предоставляется без previousNominal, то необходимо получать все данные за прошлый день и вычислять diff используя их
		if(previous_date_info.error) return setData({money:{}, error:date_info.error});
		
		money[date_info.date] = previous_date_info.next_day;
		money[previous_date_info.date] = previous_date_info.info;
		
		setData({money:money, date:date_info.date});
	}, []);
	
	useEffect(() => {
		getData();
	}, [getData]);
	
	const updateData = (money) => setData({...data, money:money});
	
	return (
		<div className="App">
			<Header />
			<div className="body">
				{data.isLoading?
					<Loading />:
					<MoneyList money={data.money} date={data.date} updateData={updateData} getDateInfo={getDateInfo}/>
				}
			</div>
			<Footer isLoading={data.isLoading}/>
		</div>
	);
}

export default App;

const names = { 
	"R01010":"Австралийский доллар",
	"R01020A":"Азербайджанский манат",
	"R01035":"Фунт стерлингов Соединенного королевства",
	"R01060":"Армянский драм",
	"R01090B":"Белорусский рубль",
	"R01100":"Болгарский лев",
	"R01115":"Бразильский реал",
	"R01135":"Венгерский форинт",
	"R01200":"Гонконгский доллар",
	"R01215":"Датская крона",
	"R01235":"Доллар США",
	"R01239":"Евро",
	"R01270":"Индийская рупия",
	"R01335":"Казахстанский тенге",
	"R01350":"Канадский доллар",
	"R01370":"Киргизский сом",
	"R01375":"Китайский юань",
	"R01500":"Молдавский лей",
	"R01535":"Норвежская крона",
	"R01565":"Польский злотый",
	"R01585F":"Румынский лей",
	"R01589":"СДР (специальные права заимствования)",
	"R01625":"Сингапурский доллар",
	"R01670":"Таджикский сомони",
	"R01700J":"Турецкая лира",
	"R01710A":"Новый туркменский манат",
	"R01717":"Узбекский сум",
	"R01720":"Украинская гривна",
	"R01760":"Чешская крона",
	"R01770":"Шведская крона",
	"R01775":"Швейцарский франк",
	"R01810":"Южноафриканский рэнд",
	"R01815":"Южнокорейская вона",
	"R01820":"Японская иена"
}
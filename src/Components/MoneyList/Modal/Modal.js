import React, { useState, useEffect } from 'react';

import Loading from "../../Loading/Loading"; 
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

import Item from "./Item/Item";

import './Modal.css';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms || 250));
}

export default function ModalMoney(props) {
	var {open, money, id, date} = props;
	const [data,setData]=useState({isLoading:true});
	
	useEffect(() => {
		getData();
	}, [props.open]);
	
	if(!id) return null;
	
	async function getData(){
		if(data.isLoading&&id){
			let day_date = date;
			let day_url = money[date].previousURL;
			let next_day_date;
			
			let money_={...money}
			let data_ = [];
			
			while (data_.length<11){
				if(!money_[day_date]){ //проверка что существует день
					let response = await props.getDateInfo(day_url,money_[next_day_date]||null); //получаем информацию за день и обновляем разцницу за следующий
					money_[day_date] = response.info;
					if(response.next_day){
						money_[next_day_date] = response.next_day;
						data_[data_.length-1].diff = response.next_day.values[id].diff
					}
					await sleep();
				}
				let date_info = {
					date:day_date,
					value:money_[day_date].values[id].value,
					diff:money_[day_date].values[id].diff
				}
				data_.push(date_info);
				
				next_day_date = day_date;
				day_url = money_[day_date].previousURL;
				day_date = money_[day_date].previousDate;
				
			}
			props.updateData(money_);
			setData({values:data_});
		}
	}
	
	
	const closeModal = () => {
		props.closeModal();
		setTimeout(()=>{setData({isLoading:true})},300);
	}
	
	
	return (
		<Modal
			open={open}
			onClose={closeModal}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
			  timeout: 300,
			}}
		>
			<Fade in={open} timeout={300}>
				<div className="modal">
					<div className="modal-back" onClick={()=>closeModal()}>
						← Вернуться к списку валют
					</div >
					<div className="modal_header">
						{money[date].values[id].name} ({money[date].values[id].charCode})
					</div>
					<div className="modal_body">
						{data.isLoading?<Loading/>:
							data.values.map((item, index) => {
								if(index===data.values.length-1) return null;
								return <Item item={item} index={index}/>;
							})
						}
					</div>
				</div>
			</Fade>
		</Modal>
	);
}
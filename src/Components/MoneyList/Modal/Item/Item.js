import Grid from "@mui/material/Grid";
import './Item.css';

export default function Item(props) {
	
	function getDate(date){
		let d = new Date(date);		
		return [("0" + d.getDate()).slice(-2),("0"+(d.getMonth()+1)).slice(-2),d.getFullYear()].join("/");
	}
	
	return (
		<div className={props.index===0?"modal_item first":"modal_item"} >
			<Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 2 }} className="item_info">
				<Grid item xs={5} className="date">
					{getDate(props.item.date)}
				</Grid>
				<Grid item xs={4} className="value">
					{props.item.value}₽
				</Grid>
				<Grid item xs={3} className={props.item.diff>=0?"diff plus":"diff minus"}>
					{props.item.diff}%{props.item.diff>=0?"▲":"▼"}
				</Grid>
			</Grid>
		</div>
	);
}
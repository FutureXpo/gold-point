import Tooltip from "@mui/material/Tooltip";
import Grid from "@mui/material/Grid";
import './Item.css';

export default function Item(props) {
	return (
		<Tooltip title={props.item.name} followCursor arrow placement="bottom-end">
			<div className="item" onClick={()=>{props.openModal(props.item.id)}}>
				<Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 0 }} className="item_info">
					<Grid item xs={4} className="charCode">
						{props.item.charCode}
					</Grid>
					<Grid item xs={4} className="value">
						{props.item.value}
					</Grid>
					<Grid item xs={4} className={props.item.diff>=0?"diff plus":"diff minus"}>
						{props.item.diff}%{props.item.diff>=0?"▲":"▼"}
					</Grid>
				</Grid>
			</div>
		</Tooltip>
	);
}
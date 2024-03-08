let ms = Date.parse('2012-01-26T13:51:50.417-07:00');
alert(ms); // 1327611110417  (timestamp)

let date = new Date( Date.parse('2012-01-26T13:51:50.417-07:00') );
alert(date);

const Date =()=>{
    return (
        <div>---------------------------------{date} --------------------------------</div>
    )
}
export default Date
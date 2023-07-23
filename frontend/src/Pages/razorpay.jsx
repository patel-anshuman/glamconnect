import axios from "axios";
import { useState } from "react";
// import Razorpay from 'razorpay';
function RazorPayy() {
	const [book, setBook] = useState({
		name: "The Fault In Our Stars",
		author: "John Green",
		price: 250,
	});

	const initPayment = (data) => {
		const options = {
			key: "rzp_test_YKejJgzYAHnIpL",
			amount: data.amount,
			currency: data.currency,
			name: book.name,
			description: "Test Transaction",
			image: book.img,
			order_id: data.id,
			handler: async (response) => {
				try {
					const verifyUrl = "http://localhost:8080/payment/verify";
					const { data } = await axios.post(verifyUrl, response);
					console.log(data);
				} catch (error) {
					console.log(error);
				}
			},
			theme: {
				color: "#3399cc",
			},
		};
		const rzp1 = new window.Razorpay(options);
		rzp1.open();
	};

	const handlePayment = async () => {
		try {
			const orderUrl = "http://localhost:8080/orders";
			const { data } = await axios.post(orderUrl, { amount: book.price });
			console.log(data);
			initPayment(data.data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<div>
				{/* <img src={book.img} alt="book_img"  /> */}
				<p>{book.name}</p>
				<p>By {book.author}</p>
				<p>
					Price : <span>&#x20B9; {book.price}</span>
				</p>
				<button onClick={handlePayment} >
					buy now
				</button>
			</div>
		</div>
	);
}

export default RazorPayy;
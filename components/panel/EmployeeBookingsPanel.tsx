import { IRoom } from "interfaces/Room";
import EditRoomInfoForm from "./EditRoomInfoForm";
import React, { useEffect, useState } from "react";
import ListBookings from "./ListBookings";
import { IBooking } from "interfaces/Booking";
import moment from "moment";
import { IEmployee, IUserProfile } from "interfaces/User";
import { userInfo } from "os";
import PostsCMS from "./PostsCMS";

interface EmployeeBookingsPanelProps {
	token: string;
	roomInfo: IRoom;
    userData: IEmployee
}

const EmployeeBookingsPanel = ({
	token,
	roomInfo,
    userData
}: EmployeeBookingsPanelProps) => {
	const [bookings, setBookings] = useState<IBooking[]>([]);
	const [filterMode, setFilterMode] = useState("specific");
	const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
	const [filteredBookings, setFilteredBookings] = useState<IBooking[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const getBookingsResponse = await fetch(
				"http://www.livehub.daw:3000/api/bookings/getEmployeeBookings",
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			const allBookings = getBookingsResponse.json();
			return allBookings;
		};
		fetchData().then((data) => {
			setBookings(data);
		});
	}, [token]);

	useEffect(() => {
		if (filterMode === "all") {
			setFilteredBookings(bookings);
		} else if (filterMode === "specific") {
			setFilteredBookings(
				bookings.filter((booking) => booking.date === date)
			);
		}
	}, [filterMode, date, bookings]);

	return (
		<div className="container">
			<div className="row">
				<h2>Bookings</h2>
				<div className="col-12">
					<div className="form-check">
						<label className="form-check-label" htmlFor="all">
							See all bookings
						</label>
						<input
							className="form-check-input"
							name="filter"
							value="all"
							checked={filterMode === "all"}
							onChange={(evt) => setFilterMode(evt.target.value)}
							type="radio"
							id="all"
						/>
					</div>
					<div className="form-check">
						<label className="form-check-label" htmlFor="specific">
							See specific day bookings
						</label>
						<input
							className="form-check-input"
							name="filter"
							value="specific"
							checked={filterMode === "specific"}
							onChange={(evt) => setFilterMode(evt.target.value)}
							type="radio"
							id="specific"
						/>
					</div>

					{filterMode === "specific" ? (
						<div className="form-field">
							<label htmlFor="date" className="form-label">
								Choose a day
							</label>
							<input
								type="date"
								className="form-control"
								value={date}
								onChange={(evt) => {
									setDate(evt.target.value);
								}}
								name="date"
								id="date"
							/>
						</div>
					) : (
						<></>
					)}
				</div>
				<ListBookings bookings={filteredBookings}></ListBookings>
			</div>
			<div className="row">
				<EditRoomInfoForm token={token} data={roomInfo} userData={userData}/>
			</div>
            <div className="row">
                <PostsCMS token={token} userData={userData}></PostsCMS>
            </div>
		</div>
	);
};
export default EmployeeBookingsPanel;

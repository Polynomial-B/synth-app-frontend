import { useEffect, useState, Suspense } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/Collection.css";
import { baseUrl } from "../config";
import Loading from "./Loading";

function Collection() {
	const [collection, setCollection] = useState([]);
	const [isCollection, setIsCollection] = useState(null);
	
	useEffect(() => {
		document.title = "Collection";
	}, []);

	useEffect(() => {
		async function fetchCollection() {
			try {
				let updateIsCollection;
				const token = localStorage.getItem("token");
				const response = await axios.get(`${baseUrl}/synths/`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				setCollection(response.data);
				updateIsCollection = true;
				setIsCollection(updateIsCollection);

			} catch (error) {
				toast.error("Could not find collection");
				setIsCollection(false);
			}
		}
		fetchCollection();
	}, []);

	return (
		<>
			<Suspense fallback={<Loading />}>
				{isCollection === null ? null : isCollection ? (
					<h2 className="collection-header">Below are your custom synths:</h2>
				) : (
					<h2 className="collection-header">
						Your collection is currently empty.
						<br />
						<Link to="/synth">Click here</Link> to customise a
						synthesiser.
					</h2>
				)}
			</Suspense>
			<div className="section">
				<div className="columns is-multiline is-mobile">
					{collection.map((collection, index) => {
						return (
							<Suspense key={index} fallback={<Loading />}>
								<div
									className="column is-one-third-desktop is-half-tablet is-half-mobile"
									key={index}
								>
									<Link to={`/tinker/${collection.id}`}>
										<div className="collection-name card">
											<div>
												<div className="container">
													{collection.name}
												</div>
												<img
													src="./src/assets/images/html-icon.png"
													alt={collection.name}
												/>
											</div>
										</div>
									</Link>
								</div>
							</Suspense>
						);
					})}
				</div>
			</div>
		</>
	);
}

export default Collection;

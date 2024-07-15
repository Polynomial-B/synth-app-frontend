import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/Collection.css";
import { baseUrl } from "../config";

function Collection() {
	const [collection, setCollection] = useState([]);

  useEffect(()=> {
    document.title = "Collection"
  }, []);

	useEffect(() => {
		async function fetchCollection() {
			try {
				const token = localStorage.getItem("token");
				const response = await axios.get(
					`${baseUrl}/synths/`,
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);
				setCollection(response.data);
			} catch (error) {
				toast.error("Error finding collection");
			}
		}
		fetchCollection();
	}, []);



	return (
		<>
			{collection.length === 0 ? (
				<h2 className="collection-header">
					Your collection is currently empty.
					<br />
					<Link to="/synth">Design one here</Link> to add to your
					collection.
				</h2>
			) : null}

			<div className="section">
				<div className="columns is-multiline is-mobile">
					{collection.map((collection, index) => {
						return (
							<div
								className="column is-one-third-desktop is-half-tablet is-half-mobile"
								key={index}
							>
								<Link to={`/tinker/${collection.id}`}>
									<div className="collection-name card">
										<div>
											<div className="container">{collection.name}</div>
											<img src="https://wallpapers.com/images/hd/purple-aesthetic-keyboard-cat-yws9dijlf2gl62r5.jpg"/>
										</div>
									</div>
								</Link>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}

export default Collection;

import { useQuery, gql } from "@apollo/client";

const LAUNCHES = gql`
  {
    launches(limit: 5) {
      launch_date_utc
      launch_success
      rocket {
        rocket_name
      }
      links {
        video_link
      }
      details
    }
  }
`;

const LaunchesNasa = () => {
  const { loading, error, data } = useQuery(LAUNCHES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.launches.map((launche) => (
    <>
      <div key={launche.rocket_name}>
        <ul>
          <li>Date UTC : {launche.launch_date_utc}</li>
          <li>Resultat : {launche.launch_success ? "succès" : "raté"}</li>
          <li>Nom : {launche.rocket.rocket_name}</li>
          <li>
            Vidéo : <a href={launche.links.video_link}>Cliquez-ici</a>
          </li>
          <li>Détails : {launche.details}</li>
        </ul>
      </div>
    </>
  ));
};

export default LaunchesNasa;

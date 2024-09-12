import { useEffect, useState } from 'react';
import './styles/index.scss';

interface Track {
  trackId: number;
  artworkUrl100: string;
  trackName: string;
  artistName: string;
  previewUrl: string;
}

interface ApiResponse {
  results: Track[];
}

function App() {
  const [data, setData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://itunes.apple.com/search?country=VN&limit=25&term='Son Tung MTP'&attribute=music`);
      const data: ApiResponse = await response.json();
      console.log(data);
      setData(data);
    };

    fetchData();
  }, []);

  return (
    <>
      {data &&
        data.results.map((item: Track) => (
          <div key={item.trackId}>
            <img src={item.artworkUrl100} alt={item.trackName} />
            <h3>{item.trackName}</h3>
            <p>{item.artistName}</p>
            <audio controls>
              <source src={item.previewUrl} type='audio/mpeg' />
              Your browser does not support the audio element.
            </audio>
          </div>
        ))}
    </>
  );
}

export default App;

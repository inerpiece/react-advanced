import { useState, useEffect } from 'react';

import MeetupList from '../components/meetups/MeetupList';


function AllMeetupsPage () {
  const [loadingState, setLoadingState] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  useEffect(() => {
    setLoadingState(true);
    fetch('https://react-advanced-d4ca6-default-rtdb.firebaseio.com/meetups.json')
    .then(response => {
      return response.json();
    })
    .then(data => {
      const meetups = [];
      for (const key in data) {
        const meetup = {
          id: key,
          ...data[key]
        };

        meetups.push(meetup)
      }
      setLoadingState(false);
      setLoadedMeetups(meetups);
    });
  }, []);

  

  if (loadingState) {
    return <section>
      <p>...loading...</p>
    </section>
  }

  return (
    <div>
      <h1>All Meetups</h1>
      <MeetupList meetups={loadedMeetups}/>
    </div>
  );
}

export default AllMeetupsPage
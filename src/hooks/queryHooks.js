import { useQuery, useMutation, useQueries } from "@tanstack/react-query";

const useGetUserdata = () =>
  useQuery(["getuserdata"], () =>
    fetch(`http://localhost:4000/userdata`).then((res) => res.json())
  );
useGetUserdata.queryKey = ["getuserdata"];

const usePostUserdata = () => {
  return useMutation(
    ({ firstname, lastname, email, age, username, password }) =>
      fetch(`http://localhost:4000/userdata`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: username,
          firstname,
          lastname,
          email,
          age,
          username,
          password,
          watchlist: [],
        }),
      })
  );
};

const useGetAuthData = () => {
  return useQuery(["getauthdata"], () =>
    fetch("http://localhost:4000/authdata").then((res) => res.json())
  );
};
useGetAuthData.queryKey = ["getauthdata"];

const usePostAuthData = () => {
  return useMutation(({ sessionExists, authenticatedUser }) =>
    fetch("http://localhost:4000/authdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionExists,
        authenticatedUser,
      }),
    })
  );
};

const useGetMovies = (queryParams) => {
  return useQuery(
    ["getmovies", queryParams],
    () => {
      return fetch(
        `https://imdb-api.com/API/AdvancedSearch/k_swlhmlaw?title_type=feature${queryParams}`
      ).then((res) => res.json());
    },
    {
      //movie data is not gonna change (unless a new movie with the same data comes :) )
      //so refetch is not needed. staleTime & cacheTime is Infinity because data is fresh a long time.
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );
};

const usePatchWatchList = () => {
  return useMutation(({ username, watchlist }) => {
    return fetch(`http://localhost:4000/userdata/${username}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ watchlist }),
    }).then((res) => res.json());
  });
};

const usePatchMovieCache = () => {
  return useMutation(
    (data) => {
      return fetch(`http://localhost:4000/moviecache/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    },
    {
      onSuccess: () =>
        console.log(
          "Don't mind the error. It doesn't break anything, It is part of the functionality :D"
        ),
    }
  );
};

const useGetMovieCache = (idlist) => {
  return useQueries({
    queries: idlist.map((id) => ({
      queryKey: ["getmoviecache", id],
      queryFn: () => {
        return fetch(`http://localhost:4000/moviecache/${id}`).then((res) =>
          res.json()
        );
      },
      cacheTime: Infinity,
      staleTime: Infinity,
    })),
  });
};

export {
  useGetAuthData,
  usePostAuthData,
  useGetUserdata,
  usePostUserdata,
  useGetMovies,
  usePatchWatchList,
  usePatchMovieCache,
  useGetMovieCache,
};

//API Keys
//If api limit reached in currently using link, replace it with any of the below
//Every key has 100 call limit perday
//https://imdb-api.com/API/AdvancedSearch/k_swlhmlaw?title_type=feature
//https://imdb-api.com/API/AdvancedSearch/k_u94oq3k9?title_type=feature
//https://imdb-api.com/API/AdvancedSearch/k_dbnh33xq?title_type=feature

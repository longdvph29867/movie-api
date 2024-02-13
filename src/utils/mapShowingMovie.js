export const mapListMovie = (listShowing) => {
  const listMovie = [];
  listShowing.forEach((e) => {
    if (!listMovie.some((movie) => movie._id === e.movie._id)) {
      listMovie.push({
        _id: e.movie._id,
        name: e.movie.name,
        poster: e.movie.poster,
        director: e.movie.director,
        runningTime: e.movie.runningTime,
        trailer: e.movie.trailer,
        imgBanner: e.movie.imgBanner,
        listTime: [],
      });
    }
  });

  listShowing.forEach((item) => {
    const movieId = item.movie._id;
    const showTime = item.showTime;
    const idShowing = item.id;

    const movie = listMovie.find((movie) => movie._id === movieId);
    movie.listTime.push({
      idShowing: idShowing,
      showTime: showTime,
      vipPrice: item.vipPrice,
      normalPrice: item.normalPrice,
    });
  });

  return listMovie;
};

export const mapListCinemaBranch = (listShowing) => {
  const listBranch = [];
  listShowing.forEach((e) => {
    if (
      !listBranch.some(
        (branch) => String(branch.idBranch) === String(e.cinemaBranch.id)
      )
    ) {
      listBranch.push({
        idBranch: e.cinemaBranch.id,
        cinemaBranchName: e.cinemaBranch.cinemaBranchName,
        cinemaBranchCode: e.cinemaBranch.cinemaBranchCode,
        slug: e.cinemaBranch.slug,
        location: e.cinemaBranch.location,
        cinema_chain_id: e.cinemaBranch.cinema_chain_id,
        listTime: [],
      });
    }
  });

  listShowing.forEach((item) => {
    const branchId = item.cinemaBranch.id;
    const showTime = item.showTime;
    const idShowing = item.id;

    const branch = listBranch.find(
      (branch) => String(branch.idBranch) === String(branchId)
    );
    branch.listTime.push({
      idShowing: idShowing,
      showTime: showTime,
      vipPrice: item.vipPrice,
      normalPrice: item.normalPrice,
    });
  });

  return listBranch;
};

export const mapListCinemaChain = (listChain, listBranch) => {
  const newListCinemaChain = listChain.map((item) => {
    return {
      id: item.id,
      cinemaName: item.cinemaName,
      cinemaCode: item.cinemaCode,
      slug: item.slug,
      logo: item.logo,
    };
  });

  listBranch.forEach((item) => {
    const branchId = item.cinema_chain_id;

    const indexChain = newListCinemaChain.findIndex(
      (chain) => String(chain.id) === String(branchId)
    );
    if (indexChain !== -1) {
      if (!newListCinemaChain[indexChain].listBranch) {
        newListCinemaChain[indexChain].listBranch = [];
      }
      newListCinemaChain[indexChain].listBranch.push(item);
    }
  });

  return newListCinemaChain.filter((item) => item.listBranch);
};

export const mapPriceSeat = (seatList, bookedSeats, vipPrice, normalPrice) => {
  return seatList.map((seat) => {
    const booked = bookedSeats.includes(seat.id);
    const price = seat.seatVip ? vipPrice : normalPrice;
    return { ...seat._doc, price, booked };
  });
};

export const mapBookedSeat = (bookedTicket) => {
  let allSeats = [];

  for (let booking of bookedTicket) {
    for (let seat of booking.seats) {
      allSeats.push(String(seat.seatId));
    }
  }
  return allSeats;
};

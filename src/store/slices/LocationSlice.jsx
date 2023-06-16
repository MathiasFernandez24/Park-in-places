import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteToLocalDb, fetchLocalDb, insertAddress } from "../../db";
import { deletePictureInFileSystem } from "../../services/RenameAndSavePicture";

const initialState = {
    places: []
}

export const addLocationDb = createAsyncThunk(
    "location/addToDb",
    async (location, asyncThunk) => {
        try {
            const result = await insertAddress(location)
            console.log("OK -se agrego correctamente a db la direccion, desde locationSlice, el resultado es: ->");
            console.log(result);
            return location
        } catch (error) {
            console.log("ERROR -agregar a db direccion desde locationSlice, el resultado es: ->");
            console.log(error);
            return
        }
    }
)

export const removeLocationDb = createAsyncThunk(
    "location/deleteLocationToDb",
    async (location, asyncThunk) => {
        try {
            const result = await deleteToLocalDb(location.id)
            await deletePictureInFileSystem(location.image)
            console.log("OK -se borro el item de la DB local, desde Location Slice");
            console.log(result);
            return location
        } catch (error) {
            console.log("ERROR -no se borro el item de la DB local, desde Location Slice");
            console.log(error);
            return
        }
    }
)

export const getLocationDb = createAsyncThunk(
    'location/getLocationToDb',
    async (_, asynkThunk) => {
        try {
            const result = await fetchLocalDb()
            console.log("OK - get datos Database Local, desde LocationSlice");
            console.log(result);
            const data = result.rows._array
            return data
        } catch (error) {

        }
    }
)

const LocationSlice = createSlice({
    name: 'location',
    initialState: initialState,
    reducers: {
        // addLocation: (state, { payload }) => {
        //     state.places = [
        //         {
        //             id: payload.id,
        //             fecha: payload.fecha,
        //             title: payload.title,
        //             image: payload.image,
        //         },
        //         ...state.places
        //     ]
        // },
        removeLocation: (state, { payload }) => {
            state.places = state.places.filter(i => i.id != payload)
        }
    },
    extraReducers: {
        [getLocationDb.fulfilled]: (state, { payload }) => {
            console.log(payload);
            state.places = payload.sort((a, b) => (b.id - a.id))
        },
        [addLocationDb.fulfilled]: (state, { payload }) => {
            state.places = [{
                id: payload.id,
                fecha: payload.fecha,
                title: payload.title,
                image: payload.image,
                latitude: payload.latitude,
                longitude: payload.longitude,
                address: payload.address,
            }, ...state.places]
        },

        [removeLocationDb.fulfilled]: (state, { payload }) => {
            state.places = state.places.filter(i => i.id != payload.id)
        }
    }
})

export const { addLocation, removeLocation } = LocationSlice.actions
const LocationReducer = LocationSlice.reducer
export default LocationReducer
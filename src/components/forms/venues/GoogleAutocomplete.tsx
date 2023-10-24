import { useRef } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { StyledInputContainer, StyledLabel, reactSelectCustomStyles } from '../../form/formStyles';
import { errorSnackbar } from '../../Snackbar/Snackbar';

// street_number: ''			          -> Numero
// route: '' 				                -> Calle
// administrative_area_level_2: '' 	-> Ciudad
// administrative_area_level_1: '' 	-> Estado/Provincia
// country: '' 				              -> Pais
// postal_code: ''				          -> Código Postal

type PlaceDetailsTypes =
  | 'street_number'
  | 'route'
  | 'administrative_area_level_2'
  | 'administrative_area_level_1'
  | 'country'
  | 'postal_code';

type SelectResult = {
  label: string;
  value: {
    description: string;
    place_id: string;
  };
};

export type PlaceDetails = {
  address_components: {
    long_name: string;
    short_name: string;
    types: PlaceDetailsTypes[];
  }[];
  geometry: {
    location: {
      lat: () => number;
      lng: () => number;
    };
  };
};

type GoogleAutocompleteProps = {
  label: string;
  onPlaceSelected: (place: PlaceDetails) => void;
};

export const GoogleAutocomplete = ({ label, onPlaceSelected }: GoogleAutocompleteProps) => {
  const placeService = useRef<google.maps.places.PlacesService>();

  const handleSelectOnChange = (newValue: SelectResult | null) => {
    if (newValue && placeService.current) {
      // Google Places API
      placeService.current.getDetails(
        { placeId: newValue.value.place_id, fields: ['address_components', 'geometry'] },
        (place) => {
          onPlaceSelected(place as PlaceDetails);
        }
      );
    }
  };

  const loadService = () => {
    if (window?.google?.maps?.places?.PlacesService) {
      placeService.current = new window.google.maps.places.PlacesService(document.createElement('div'));
    }
  };

  return (
    <StyledInputContainer>
      <StyledLabel>{label}</StyledLabel>

      <GooglePlacesAutocomplete
        ref={() => loadService()}
        apiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY}
        selectProps={{
          defaultInputValue: '',
          // @ts-ignore
          onChange: handleSelectOnChange,
          placeholder: '',
          // @ts-ignore
          styles: reactSelectCustomStyles(false, false),
          isClearable: true,
          noOptionsMessage: ({ inputValue }) =>
            inputValue && inputValue.length > 0 ? 'No hay resultados' : 'Empieza a escribir para buscar'
        }}
        debounce={700}
        onLoadFailed={(error) => {
          errorSnackbar(`Error al cargar el mapa de Google. Contacte a soporte. Error: ${error.message}`);
        }}
      />
    </StyledInputContainer>
  );
};

//Third party imports
import {
  TextField,
  Typography,
  Button,
  styled,
  Modal,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";

//Local imports
import { querySliceActions } from "../store/querySlice";

const FilterBox = styled(Grid)`
  width: 600px;
  padding-right: 32px;
  padding-bottom: 32px;
  border-radius: 10px;
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &:focus {
    outline: none;
  }
`;

const StyledSelect = styled(Select)``;

const genreSelectOptions = [
  { value: "action", label: "Action" },
  { value: "adventure", label: "Adventure" },
  { value: "comedy", label: "Comedy" },
  { value: "crime", label: "Crime" },
  { value: "drama", label: "Drama" },
  { value: "family", label: "Family" },
  { value: "fantasy", label: "Fantasy" },
  { value: "horror", label: "Horror" },
  { value: "mystery", label: "Mystery" },
  { value: "romance", label: "Romance" },
  { value: "thriller", label: "Thriller" },
  { value: "sci_fi", label: "Sci-Fi" },
];

const languageSelectOptions = [
  { value: "ab", label: "Abkhazian" },
  { value: "aa", label: "Afar" },
  { value: "af", label: "Afrikaans" },
  { value: "sq", label: "Albanian" },
  { value: "am", label: "Amharic" },
  { value: "ar", label: "Arabic" },
  { value: "hy", label: "Armenian" },
  { value: "as", label: "Assamese" },
  { value: "ay", label: "Aymara" },
  { value: "az", label: "Azerbaijani" },
  { value: "ba", label: "Bashkir" },
  { value: "eu", label: "Basque" },
  { value: "bn", label: "Bengali, Bangla" },
  { value: "dz", label: "Bhutani" },
  { value: "bh", label: "Bihari" },
  { value: "bi", label: "Bislama" },
  { value: "br", label: "Breton" },
  { value: "bg", label: "Bulgarian" },
  { value: "my", label: "Burmese" },
  { value: "be", label: "Byelorussian" },
  { value: "km", label: "Cambodian" },
  { value: "ca", label: "Catalan" },
  { value: "zh", label: "Chinese" },
  { value: "co", label: "Corsican" },
  { value: "hr", label: "Croatian" },
  { value: "cs", label: "Czech" },
  { value: "da", label: "Danish" },
  { value: "nl", label: "Dutch" },
  { value: "en", label: "English, American" },
  { value: "eo", label: "Esperanto" },
  { value: "et", label: "Estonian" },
  { value: "fo", label: "Faeroese" },
  { value: "fj", label: "Fiji" },
  { value: "fi", label: "Finnish" },
  { value: "fr", label: "French" },
  { value: "fy", label: "Frisian" },
  { value: "gd", label: "Gaelic (Scots Gaelic)" },
  { value: "gl", label: "Galician" },
  { value: "ka", label: "Georgian" },
  { value: "de", label: "German" },
  { value: "el", label: "Greek" },
  { value: "kl", label: "Greenlandic" },
  { value: "gn", label: "Guarani" },
  { value: "gu", label: "Gujarati" },
  { value: "ha", label: "Hausa" },
  { value: "iw", label: "Hebrew" },
  { value: "hi", label: "Hindi" },
  { value: "hu", label: "Hungarian" },
  { value: "is", label: "Icelandic" },
  { value: "in", label: "Indonesian" },
  { value: "ia", label: "Interlingua" },
  { value: "ie", label: "Interlingue" },
  { value: "ik", label: "Inupiak" },
  { value: "ga", label: "Irish" },
  { value: "it", label: "Italian" },
  { value: "ja", label: "Japanese" },
  { value: "jw", label: "Javanese" },
  { value: "kn", label: "Kannada" },
  { value: "ks", label: "Kashmiri" },
  { value: "kk", label: "Kazakh" },
  { value: "rw", label: "Kinyarwanda" },
  { value: "ky", label: "Kirghiz" },
  { value: "rn", label: "Kirundi" },
  { value: "ko", label: "Korean" },
  { value: "ku", label: "Kurdish" },
  { value: "lo", label: "Laothian" },
  { value: "la", label: "Latin" },
  { value: "lv", label: "Latvian, Lettish" },
  { value: "ln", label: "Lingala" },
  { value: "lt", label: "Lithuanian" },
  { value: "mk", label: "Macedonian" },
  { value: "mg", label: "Malagasy" },
  { value: "ms", label: "Malay" },
  { value: "ml", label: "Malayalam" },
  { value: "mt", label: "Maltese" },
  { value: "mi", label: "Maori" },
  { value: "mr", label: "Marathi" },
  { value: "mo", label: "Moldavian" },
  { value: "mn", label: "Mongolian" },
  { value: "na", label: "Nauru" },
  { value: "ne", label: "Nepali" },
  { value: "no", label: "Norwegian" },
  { value: "oc", label: "Occitan" },
  { value: "or", label: "Oriya" },
  { value: "om", label: "Oromo, Afan" },
  { value: "ps", label: "Pashto, Pushto" },
  { value: "fa", label: "Persian" },
  { value: "pl", label: "Polish" },
  { value: "pt", label: "Portuguese" },
  { value: "pa", label: "Punjabi" },
  { value: "qu", label: "Quechua" },
  { value: "rm", label: "Rhaeto-Romance" },
  { value: "ro", label: "Romanian" },
  { value: "ru", label: "Russian" },
  { value: "sm", label: "Samoan" },
  { value: "sg", label: "Sangro" },
  { value: "sa", label: "Sanskrit" },
  { value: "sr", label: "Serbian" },
  { value: "sh", label: "Serbo-Croatian" },
  { value: "st", label: "Sesotho" },
  { value: "tn", label: "Setswana" },
  { value: "sn", label: "Shona" },
  { value: "sd", label: "Sindhi" },
  { value: "si", label: "Singhalese" },
  { value: "ss", label: "Siswati" },
  { value: "sk", label: "Slovak" },
  { value: "sl", label: "Slovenian" },
  { value: "so", label: "Somali" },
  { value: "es", label: "Spanish" },
  { value: "su", label: "Sudanese" },
  { value: "sw", label: "Swahili" },
  { value: "sv", label: "Swedish" },
  { value: "tl", label: "Tagalog" },
  { value: "tg", label: "Tajik" },
  { value: "ta", label: "Tamil" },
  { value: "tt", label: "Tatar" },
  { value: "te", label: "Tegulu" },
  { value: "th", label: "Thai" },
  { value: "bo", label: "Tibetan" },
  { value: "ti", label: "Tigrinya" },
  { value: "to", label: "Tonga" },
  { value: "ts", label: "Tsonga" },
  { value: "tr", label: "Turkish" },
  { value: "tk", label: "Turkmen" },
  { value: "tw", label: "Twi" },
  { value: "uk", label: "Ukrainian" },
  { value: "ur", label: "Urdu" },
  { value: "uz", label: "Uzbek" },
  { value: "vi", label: "Vietnamese" },
  { value: "vo", label: "Volapuk" },
  { value: "cy", label: "Welsh" },
  { value: "wo", label: "Wolof" },
  { value: "xh", label: "Xhosa" },
  { value: "ji", label: "Yiddish" },
  { value: "yo", label: "Yoruba" },
  { value: "zu", label: "Zulu" },
];

const FilterModal = ({ isOpen, closeModal }) => {
  const filterData = useSelector((s) => s.query.filterData);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [maxResults, setMaxResults] = useState();
  const [genre, setGenre] = useState();
  const [language, setLanguage] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    setFromDate(filterData.fromDate);
    setToDate(filterData.toDate);
    setMaxResults(filterData.maxResults);
    setGenre(filterData.genre);
    setLanguage(filterData.language);
  }, [filterData]);

  return (
    <Modal
      open={isOpen}
      onClose={() => {
        //save filter data when filter modal is closed
        dispatch(
          querySliceActions.setFilter({
            fromDate,
            toDate,
            maxResults,
            genre,
            language,
          })
        );
        closeModal();
      }}
    >
      <FilterBox
        container
        component="form"
        justifyItems={"center"}
        spacing={4}
        color={"primary.main"}
      >
        <Grid item xs={12}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              paddingBottom: "10px",
              borderBottom: "1px solid",
              borderBottomColor: "primary",
              textAlign: "center",
            }}
          >
            Search Filter
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle2">From Date</Typography>
          <TextField
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle2">To Date</Typography>
          <TextField
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle2">Max Results</Typography>
          <TextField
            type="number"
            value={maxResults}
            onChange={(e) => setMaxResults(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2">Genre</Typography>
          <StyledSelect
            options={genreSelectOptions}
            placeholder="Select Genre..."
            isMulti
            onChange={(chosen) => setGenre(chosen.map(({ value }) => value))}
            value={genreSelectOptions.filter(({ value }) =>
              genre?.includes(value)
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2">Language</Typography>
          <StyledSelect
            options={languageSelectOptions}
            placeholder="Select Language..."
            isMulti
            onChange={(chosen) => setLanguage(chosen.map(({ value }) => value))}
            value={languageSelectOptions.filter(({ value }) =>
              language?.includes(value)
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            children="Reset"
            onClick={() => dispatch(querySliceActions.resetFilter())}
            fullWidth
          />
        </Grid>
      </FilterBox>
    </Modal>
  );
};

export default FilterModal;

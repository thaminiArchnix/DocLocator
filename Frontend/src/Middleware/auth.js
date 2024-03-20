import axios from "axios";

export async function auth(givenToken, givenEmail) {
  try {
    const token = {
      token: `${givenToken}`,
    };
    const authData = await axios.post(
      "http://localhost:3000/auth/authUser",
      token
    );
    if (authData.data.email === givenEmail) {
      return true;
    }
  } catch (error) {
    console.error(error);
    alert(`Error authenticating : ${error}`);
  }
}

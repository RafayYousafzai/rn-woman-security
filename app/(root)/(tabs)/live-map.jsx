import Map from "@/components/Map";
import { useFirebase } from "@/context/firebaseContext";

export default function LiveMap() {
  const { users, userData } = useFirebase();

  const trustedContacts =
    userData?.trustedContacts?.map((contact) => contact.phone) || [];

  const filteredContacts = users
    .filter(
      (contact) => trustedContacts.includes(contact.phone) && contact.location
    )
    .map((contact) => ({
      latitude: contact.location.coords.latitude,
      longitude: contact.location.coords.longitude,
      name: contact.name,
      phone: contact.phone,
    }));

  // console.log(filteredContacts);

  return <Map filteredContacts={filteredContacts} />;
}

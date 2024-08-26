import { PrismaClient } from "@prisma/client/extension";
import amenitiesData from "../src/data/amenities.json" assert { type: "json" };
import bookingsData from "../src/data/bookings.json" assert { type: "json" };
import hostsData from "../src/data/hosts.json" assert { type: "json" };
import propertiesData from "../src/data/properties.json" assert { type: "json" };
import reviewsData from "../src/data/reviews.json" assert { type: "json" };
import usersData from "../src/data/users.json" assert { type: "json" };

const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

async function main() {
  const { amenities } = amenitiesData;
  const { bookings } = bookingsData;
  const { hosts } = hostsData;
  const { properties } = propertiesData;
  const { reviews } = reviewsData;
  const { users } = usersData;

  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: {
        id: user.id,
        name: user.name || "",
        email: user.email || "",
        password: user.password || "",
        phoneNumber: user.phoneNumber || "",
        profilePicture: user.profilePicture || "",
      },
    });
  }

  for (const host of hosts) {
    await prisma.host.upsert({
      where: { id: host.id },
      update: {},
      create: {
        id: host.id,
        name: host.name || "",
        email: host.email || "",
        password: host.password || "",
        phoneNumber: host.phoneNumber || "",
        profilePicture: host.profilePicture || "",
        aboutMe: host.aboutMe || "",
      },
    });
  }

  for (const property of properties) {
    await prisma.property.upsert({
      where: { id: property.id },
      update: {},
      create: {
        id: property.id,
        title: property.title || "",
        description: property.description || "",
        location: property.location || "",
        pricePerNight: property.pricePerNight || 0,
        bedroomCount: property.bedroomCount || 0,
        bathRoomCount: property.bathRoomCount || 0,
        maxGuestCount: property.maxGuestCount || 0,
        rating: property.rating || 0,
        host: {
          connect: { id: property.hostId },
        },
      },
    });
  }

  for (const review of reviews) {
    await prisma.review.upsert({
      where: { id: review.id },
      update: {},
      create: {
        id: review.id,
        rating: review.rating || null,
        comment: review.comment || "",
        user: {
          connect: { id: review.userId },
        },
        property: {
          connect: { id: review.propertyId },
        },
      },
    });
  }

  for (const booking of bookings) {
    await prisma.booking.upsert({
      where: { id: booking.id },
      update: {},
      create: {
        id: booking.id,
        checkinDate: booking.checkinDate || new Date(),
        checkoutDate: booking.checkoutDate || new Date(),
        numberOfGuests: booking.numberOfGuests || 0,
        totalPrice: booking.totalPrice || 0,
        bookingStatus: booking.bookingStatus || "pending",
        property: {
          connect: { id: booking.propertyId },
        },
        user: {
          connect: { id: booking.userId },
        },
      },
    });
  }

  for (const amenity of amenities) {
    await prisma.amenity.upsert({
      where: { id: amenity.id },
      update: {},
      create: {
        id: amenity.id,
        name: amenity.name || "",
        property: {
          connect: { id: amenity.propertyId },
        },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

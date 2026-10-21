CREATE TABLE Registrations (
	Id TEXT(6) NOT NULL,
	Email TEXT,
	Tel TEXT,
	TicketsReserved INTEGER,
	CONSTRAINT Registration_PK PRIMARY KEY (Id)
)

Insert into Registrations (Id,Email,Tel,TicketsReserved)
values
	("BRL807", "someEmail@gmail.com","459 318 864", 2),
	("0DD23V", "myEmail@centrum.com","492 447 261", 4)
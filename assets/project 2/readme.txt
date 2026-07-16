README: How to configure the project (e.g. if any database scripts need to be run) The file has SQL scripts to create the required tables for maintaining user profiles, therapist information, and appointment schedules.

CREATE TABLE [dbo].[Users] ( [UserID] INT IDENTITY (1, 1) NOT NULL, [Username] VARCHAR (MAX) NULL, [Email] VARCHAR (MAX) NULL, [Password] VARCHAR (MAX) NULL, [FirstName] VARCHAR (MAX) NULL, [LastName] VARCHAR (MAX) NULL, [age] NVARCHAR (MAX) NULL, [gender] VARCHAR (10) NULL, [UserType] VARCHAR (MAX) DEFAULT ('User') NULL, PRIMARY KEY CLUSTERED ([UserID] ASC) );

CREATE TABLE [dbo].[TimeBlocks] ( [time] VARCHAR (MAX) NOT NULL );

CREATE TABLE [dbo].[Appointments] ( [therapistName] VARCHAR (MAX) NOT NULL );

CREATE TABLE [dbo].[appointment_details] ( [chosen_date] DATE NULL, [chosen_therapistName] VARCHAR (MAX) NULL, [chosen_timeBlock] VARCHAR (50) NULL, [visit_desc] VARCHAR (MAX) NULL, [userID] INT NULL );

INSERT INTO Users (Username,Email,Password,Firstname,LastName,age,gender,UserType) VALUES ('Kenshun','ken@gmail.com','123','KEN','DEMARTIN',19,'MALE','Therapist'), ('Kerby','kerby@gmail.com','123','CHRISTIAN','SALANDANAN',19,'MALE','Therapist'), ('Mnlvgan','vincent@gmail.com','123','VINCENT','NUÑEZ',19,'MALE','Therapist'), ('Carlie','carlie@gmail.com','123','CARLIE','ENDAYA',19,'FEMALE','Therapist'), ('Mico','mico@gmail.com','123','MICO','ESCOSURA',19,'MALE','Therapist'), ('Phaula','phaula@gmail.com','123','PHAULA','BRIOL',19,'FEMALE','Therapist')

INSERT INTO Appointments VALUES ('KEN DE MARTIN'), ('CHRISTIAN SALANDANAN'), ('VINCENT NUÑEZ'), ('CARLIE ENDAYA'), ('MICO ESCOSURA'), ('PHAULA BRIOL')

INSERT INTO TimeBlocks VALUES ('8:00 AM'), ('9:00 AM'), ('10:00 AM'), ('11:00 AM'), ('1:00 PM'), ('2:00 PM'), ('3:00 PM'), ('4:00 PM')

Additionally, the user’s connection string modification is crucial to be permitted to perform CRUD operations on the database tables. In the project, the ‘var connection string’ value should be modified with the user’s connection string.

How to run the project To run the ASP.NET WebForms project, opening the project is the first step. Then set up the database needed for the project to open the connection. Configure the connection strings for properly connecting the database to the project. Having a start page, clicking the “run” button (in Visual Studio) will execute and open the first page the user should look at when visiting the website.

The architecture of the project (i.e. how the project is structured).

The architecture of the CareBy project follows a typical three-tier architecture, separating concerns into presentation, business logic, and data access layers:

Presentation Layer: This layer comprises the ASP.NET Webforms and Master Page for building the user interface (UI) of the CareBy website. The website includes pages such as login/register, home, profile form, about us, and contact for the user. The website also contains a therapist page for the registered therapists in CareBy. Additionally, the user interface allows users to interact with the website which includes: Logging in and registering for the service, Browsing therapist profiles, Editing user profiles, Booking appointments, and Managing schedules.

Business Logic Layer: The business logic layer contains the code that implements the application's business rules and processes, ensuring proper validation and processing of user requests. The backend includes the client-side(Javascript) functions, server-side(C#) functions or code-behind, and lastly, classes for the Database connection. This layer handles tasks such as User authentication, Appointment scheduling, Displaying and updating user & therapist profiles, and Cancelling profile edits and appointments.

Data Access Layer: The data access layer is responsible for interacting with the database to retrieve and store data. This layer communicates with the SQL Server database to perform CRUD (Create, Read, Update, Delete) operations on Inserting user information once registered, Retrieving user and therapist profiles and information, Updating profile information, and Retrieving and deleting appointment schedules.

The features of your project. Provide screenshots of your project For the User end: Register and Log In
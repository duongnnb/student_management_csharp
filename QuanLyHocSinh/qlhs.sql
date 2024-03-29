USE [master]
GO
/****** Object:  Database [QLHS]    Script Date: 11/22/2018 7:06:58 AM ******/
CREATE DATABASE [QLHS]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'QLHS', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL11.SQLEXPRESS\MSSQL\DATA\QLHS.mdf' , SIZE = 4160KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'QLHS_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL11.SQLEXPRESS\MSSQL\DATA\QLHS_log.ldf' , SIZE = 784KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [QLHS] SET COMPATIBILITY_LEVEL = 110
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [QLHS].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [QLHS] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [QLHS] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [QLHS] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [QLHS] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [QLHS] SET ARITHABORT OFF 
GO
ALTER DATABASE [QLHS] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [QLHS] SET AUTO_CREATE_STATISTICS ON 
GO
ALTER DATABASE [QLHS] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [QLHS] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [QLHS] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [QLHS] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [QLHS] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [QLHS] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [QLHS] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [QLHS] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [QLHS] SET  ENABLE_BROKER 
GO
ALTER DATABASE [QLHS] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [QLHS] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [QLHS] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [QLHS] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [QLHS] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [QLHS] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [QLHS] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [QLHS] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [QLHS] SET  MULTI_USER 
GO
ALTER DATABASE [QLHS] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [QLHS] SET DB_CHAINING OFF 
GO
ALTER DATABASE [QLHS] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [QLHS] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
USE [QLHS]
GO
/****** Object:  StoredProcedure [dbo].[addStudent]    Script Date: 11/22/2018 7:06:58 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[addStudent]
    @fidstudent varchar(20) ,
    @ffullname nvarchar(100) ,
    @fbirthday varchar(20) ,
    @fgender varchar(2) ,
    @femail varchar(100) ='',
    @fphonenumber varchar(20) ='',
    @faddress nvarchar(500)
AS
    BEGIN

	DECLARE @query NVARCHAR(max)='';
	SET @query = 
	'INSERT INTO dbo.Students
	        ( StudentID ,
	          FullName ,
	          BirthDay ,
	          Gender ,
	          Email ,
	          PhoneNumber ,
	          Address
	        )
	VALUES  ( '+@fidstudent+' , 
	          '+'N'+''''+@ffullname+''''+', 
	          '+''''+@fbirthday+''''+' , 
	          '+@fgender+' , 
	          '+''''+@femail+''''+' , 
	          '+''''+@fphonenumber+''''+' , 
	          '+'N'+''''+@faddress+''''+' 
	        )'
		--SELECT @query
		EXEC(@query)
    END

GO
/****** Object:  StoredProcedure [dbo].[checklogin]    Script Date: 11/22/2018 7:06:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[checklogin]
    @fusername VARCHAR(20) ,
    @fpassword VARCHAR(20)
AS
    BEGIN
        SELECT  
                U.FullName ,
                U.Role	
        FROM    dbo.Users AS U
        WHERE   U.username = @fusername
                AND U.password = @fpassword 

    END
GO
/****** Object:  StoredProcedure [dbo].[getClassByLevel]    Script Date: 11/22/2018 7:06:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[getClassByLevel] @iDLevel varchar(100)
AS
    BEGIN
        DECLARE @stridlv VARCHAR(100)= ''
        IF ( @iDLevel != '0' )
            SET @stridlv = ' AND C.ClassLevel = '+@iDLevel
        
		DECLARE @strQuery NVARCHAR(max) =''
		SET @strQuery='
		SELECT  *
        FROM    Classes C
        WHERE   1 = 1 '+ @stridlv

			EXEC sp_executesql @strQuery

		--SELECT @strQuery
    END

GO
/****** Object:  StoredProcedure [dbo].[GetClasses]    Script Date: 11/22/2018 7:06:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetClasses]
AS
    BEGIN
        SELECT  C.ID ,
                C.ClassName ,
                CL.LevelName
        FROM    dbo.Classes C
                JOIN dbo.ClassLevel CL ON C.ClassLevel = CL.ID
	
    END

GO
/****** Object:  StoredProcedure [dbo].[getClassLevel]    Script Date: 11/22/2018 7:06:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[getClassLevel]
as
begin
select * from ClassLevel
end


GO
/****** Object:  StoredProcedure [dbo].[getListSubject]    Script Date: 11/22/2018 7:06:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[getListSubject]
AS
    BEGIN

       SELECT * FROM dbo.Subject AS S WHERE S.Flag= 0

    END

GO
/****** Object:  StoredProcedure [dbo].[getStudentByID]    Script Date: 11/22/2018 7:06:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[getStudentByID] @id VARCHAR(20)
AS
    BEGIN
   	
	SELECT * FROM QLHS..Students S WHERE S.StudentID = @id
    END

	UPDATE Students SET ClassLevel = 1


GO
/****** Object:  StoredProcedure [dbo].[getStudentDetail]    Script Date: 11/22/2018 7:06:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[getStudentDetail] @idname NVARCHAR(200)
AS
    BEGIN

        SELECT  S.StudentID ,
                S.FullName ,
                C.ClassName ,
                1 AS TBHK1 ,
                2 AS TBHK2
        FROM    dbo.Students S
                JOIN dbo.Classes AS C ON S.Class = C.ID
        WHERE   S.StudentID LIKE '%' + @idname + '%'
                OR S.FullName LIKE N'%' + @idname+'%'
    END

GO
/****** Object:  StoredProcedure [dbo].[getStudentPoint]    Script Date: 11/22/2018 7:06:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[getStudentPoint] @fsubjectid VARCHAR(100),@fclassid VARCHAR(100)
AS
    BEGIN

        SELECT  S.StudentID,S.FullName,p.Test15Minutes,P.Test45Minutes,P.TestSemester
        FROM    dbo.Students AS S
                JOIN dbo.Point AS P ON S.StudentID = P.StudenID 
				WHERE P.SubjectID = @fsubjectid
				AND s.Class = @fclassid

    END
GO
/****** Object:  StoredProcedure [dbo].[getStudents]    Script Date: 11/22/2018 7:06:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[getStudents]
AS
BEGIN
SELECT 
       S.StudentID ,
       S.FullName ,
       S.BirthDay ,
       S.Gender ,
       S.Email ,
       S.PhoneNumber ,
       S.Address FROM dbo.Students S
END


GO
/****** Object:  StoredProcedure [dbo].[getStudentsByClass]    Script Date: 11/22/2018 7:06:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[getStudentsByClass]
@fclass varchar(2)
as begin

select * from students where Class =@fclass

end
GO
/****** Object:  StoredProcedure [dbo].[getSubjects]    Script Date: 11/22/2018 7:06:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[getSubjects]

AS

    BEGIN

        SELECT  ID,S.SubjectName,S.Type,S.Period

        FROM    dbo.Subject S

    END 

GO
/****** Object:  StoredProcedure [dbo].[ReportFolowSubject]    Script Date: 11/22/2018 7:06:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[ReportFolowSubject] @Year Int = 0, @Semester int,@SubjectID VARCHAR(7)
AS
--Tỷ lệ chia sau
BEGIN
	Select C.ID,C.ClassName,Count(*) SiSo, Sum(CASE WHEN Average >=5 THEN 1 ELSE 0 END) SlOk From
	(Select * from Point where semester = @Semester AND @SubjectID = SubjectID
	 AND  Year(Date) = CASE WHEN @Year = 0 THEN Year(Getdate()) ELSE  @Year END
	) AS A
	INNER JOIN
	(Select ID,ClassName from Classes ) AS C ON A.ClassID = C.ID
	GROUP BY C.ID, C.ClassName
END
--Exec ReportFolowSubject 2018,1,'MH00001'


GO
/****** Object:  StoredProcedure [dbo].[ReportFolowYear]    Script Date: 11/22/2018 7:06:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[ReportFolowYear] @Year Int = 0, @Semester int
AS
--Tỷ lệ chia sau
--ReportFolowYear 2018,1
BEGIN
	Select C.ID, C.ClassName,Count(*) SiSo, Count(*) - Sum(CASE WHEN c1=c2 THEN 0 ELSE 1 END) SlOk   From
	(Select StudentID,ClassID,Count(*) c1,Sum(Case when Average >= 5 THEN 1 ELSE 0 END) c2 
		from Point 
		where semester = @Semester  AND Year(Date) = CASE WHEN @Year = 0 THEN Year(Getdate()) ELSE  @Year END
		Group By StudentID ,ClassID
	) AS A
	INNER JOIN
	(Select ID,ClassName from Classes ) AS C ON A.ClassID = C.ID
	GROUP BY C.ID, C.ClassName
END

GO
/****** Object:  StoredProcedure [dbo].[UpdateStudentPoint]    Script Date: 11/22/2018 7:06:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[UpdateStudentPoint]
    @fids VARCHAR(10) ,
    @fp15 VARCHAR(10) ,
    @fp45 VARCHAR(10) ,
    @fpl VARCHAR(10)
AS
    BEGIN
        UPDATE  dbo.Point
        SET     Test15Minutes = @fp15 ,
                Test45Minutes = @fp45 ,
                TestSemester = @fpl
        WHERE   StudenID = @fids

    END
GO
/****** Object:  Table [dbo].[Classes]    Script Date: 11/22/2018 7:06:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Classes](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ClassName] [nvarchar](255) NULL,
	[ClassLevel] [int] NULL,
	[Total] [int] NULL,
	[Flag] [int] NULL,
	[MaxTotal] [int] NULL,
 CONSTRAINT [PK__Classes__3214EC27BA59D8BE] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ClassLevel]    Script Date: 11/22/2018 7:06:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ClassLevel](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[LevelName] [nvarchar](255) NULL,
	[MaxTotal] [int] NULL,
 CONSTRAINT [PK__ClassLev__3214EC2759373ABE] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Customer]    Script Date: 11/22/2018 7:06:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Customer](
	[CUSId] [int] IDENTITY(1,1) NOT NULL,
	[CUSKey]  AS ('Cus'+right('0000'+CONVERT([varchar](5),[CUSId]),(5))) PERSISTED,
	[CusName] [varchar](50) NULL,
	[mobileno] [int] NULL,
	[Gender] [varchar](10) NULL,
PRIMARY KEY CLUSTERED 
(
	[CUSId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Point]    Script Date: 11/22/2018 7:06:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Point](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[StudentID] [nvarchar](255) NOT NULL,
	[SubjectID] [nvarchar](255) NOT NULL,
	[Semester] [int] NULL,
	[Test15Minutes] [float] NULL,
	[Test45Minutes] [float] NULL,
	[TestSemester] [float] NULL,
	[Average] [float] NULL,
	[Flag] [int] NULL,
	[StudenJoinID] [nvarchar](255) NULL,
	[Date] [date] NULL,
	[ClassID] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[RuleAge]    Script Date: 11/22/2018 7:06:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RuleAge](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[MinAge] [int] NOT NULL,
	[MaxAge] [int] NOT NULL,
	[Flag] [nchar](10) NULL,
 CONSTRAINT [PK_RuleAge] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[RuleStandardScore]    Script Date: 11/22/2018 7:06:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[RuleStandardScore](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[StandardScore] [float] NULL,
	[Flag] [varchar](10) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[RuleSubject]    Script Date: 11/22/2018 7:06:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[RuleSubject](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[IDSubject] [int] NOT NULL,
	[MaxTotal] [int] NOT NULL,
	[Flag] [varchar](10) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Students]    Script Date: 11/22/2018 7:06:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Students](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[StudentID]  AS ('HS'+right('0000'+CONVERT([varchar](5),[ID]),(5))) PERSISTED,
	[FullName] [nvarchar](255) NULL,
	[BirthDay] [datetime] NULL,
	[Gender] [int] NULL,
	[Email] [nvarchar](255) NULL,
	[PhoneNumber] [nvarchar](20) NULL,
	[Address] [nvarchar](500) NULL,
	[ClassLevel] [int] NULL,
	[Class] [int] NULL,
	[State] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Subject]    Script Date: 11/22/2018 7:06:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Subject](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[SubjectID]  AS ('MH'+right('0000'+CONVERT([varchar](5),[ID]),(5))) PERSISTED,
	[SubjectName] [nvarchar](255) NULL,
	[Flag] [int] NULL,
	[Type] [int] NULL,
	[Level1] [int] NULL,
	[Level2] [int] NULL,
	[Level3] [int] NULL,
	[Period] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Users]    Script Date: 11/22/2018 7:06:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Users](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[FullName] [nvarchar](200) NULL,
	[username] [varchar](20) NULL,
	[password] [varchar](50) NULL,
	[email] [varchar](100) NULL,
	[Role] [int] NULL,
	[address] [nvarchar](max) NULL,
	[phonenumber] [varchar](20) NULL,
	[flag] [int] NULL,
	[birthday] [datetime] NULL,
	[gender] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Trigger [dbo].[after_modify]    Script Date: 11/22/2018 7:06:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[after_modify] ON [dbo].[Point]
    AFTER INSERT, UPDATE
AS
    BEGIN
        DECLARE @id INT ,
            @t1 FLOAT ,
            @t2 FLOAT ,
            @t3 FLOAT;

        SELECT  @id = Inserted.ID ,
                @t1 = Inserted.Test15Minutes ,
                @t2 = Inserted.Test45Minutes ,
                @t3 = Inserted.TestSemester
        FROM    inserted

        IF ( ISNULL(@t1, '') != ''
             AND ISNULL(@t2, '') != ''
             AND ISNULL(@t2, '') != ''
           )
            BEGIN
                UPDATE  dbo.Point
                SET     Average =  cast(round((@t1 + @t2*2 + @t3*3)/6,2) as numeric(36,2))
                WHERE   ID = @id
            END 
        ELSE
            BEGIN
                UPDATE  dbo.Point
                SET     Average = NULL
                WHERE   ID = @id
            END
    END
GO
/****** Object:  Trigger [dbo].[after_modify_student]    Script Date: 11/22/2018 7:06:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[after_modify_student] ON [dbo].[Students]
    AFTER INSERT, DELETE
AS
    BEGIN
        DECLARE @id INT ,
            @total INT  

        SELECT  @id = Inserted.Class
        FROM    inserted

        SELECT  @total = COUNT(*)
        FROM    dbo.Students AS S
        WHERE   S.Class = @id

        UPDATE  dbo.Classes
        SET     Total = @total
        WHERE   ID = @id
         
    END
GO
/****** Object:  Trigger [dbo].[after_UPDATE_student]    Script Date: 11/22/2018 7:06:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE TRIGGER [dbo].[after_UPDATE_student] ON [dbo].[Students]
    AFTER UPDATE
AS
    BEGIN
        DECLARE @idclass_old INT ,
            @idclass_new INT ,
            @total_new INT ,
            @total_old INT  


        SELECT  @idclass_new = i.Class ,
                @idclass_old = d.Class
        FROM    inserted i
                JOIN deleted d ON ( i.ID = d.ID )
        IF ( @idclass_new != @idclass_old )
            BEGIN 
                SELECT  @total_new = COUNT(*)
                FROM    dbo.Students AS S
                WHERE   S.Class = @idclass_new
				
                SELECT  @total_old = COUNT(*)
                FROM    dbo.Students AS S
                WHERE   S.Class = @idclass_old

                UPDATE  dbo.Classes
                SET     Total = @total_old
                WHERE   ID = @idclass_old
				
                UPDATE  dbo.Classes
                SET     Total = @total_new
                WHERE   ID = @idclass_new

            END 
    END
GO
USE [master]
GO
ALTER DATABASE [QLHS] SET  READ_WRITE 
GO

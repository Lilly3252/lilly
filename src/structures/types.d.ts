export interface JSONdata {
    Achievements:       null;
    AchievementsPublic: null;
    Character:          Character;
    FreeCompany:        FreeCompany;
    FreeCompanyMembers: null;
    Friends:            null;
    FriendsPublic:      null;
    Minions:            null;
    Mounts:             null;
    PvPTeam:            null;
}

export interface Character {
    ActiveClassJob:     ClassJob;
    Avatar:             string;
    Bio:                string;
    ClassJobs:          ClassJob[];
    ClassJobsBozjan:    ClassJobsBozjan;
    ClassJobsElemental: ClassJobsElemental;
    DC:                 string;
    FreeCompanyId:      string;
    FreeCompanyName:    string;
    GearSet:            GearSet;
    Gender:             number;
    GrandCompany:       GrandCompany;
    GuardianDeity:      number;
    ID:                 number;
    Lang:               null;
    Name:               string;
    Nameday:            string;
    ParseDate:          number;
    Portrait:           string;
    PvPTeamId:          null;
    Race:               number;
    Server:             string;
    Title:              number;
    TitleTop:           boolean;
    Town:               number;
    Tribe:              number;
}

export interface ClassJob {
    ClassID:       number;
    ExpLevel:      number;
    ExpLevelMax:   number;
    ExpLevelTogo:  number;
    IsSpecialised: boolean;
    JobID:         number;
    Level:         number;
    Name:          string;
    UnlockedState: UnlockedState;
}

export interface UnlockedState {
    ID:   number | null;
    Name: string;
}

export interface ClassJobsBozjan {
    Level:  number;
    Mettle: null;
    Name:   string;
}

export interface ClassJobsElemental {
    ExpLevel:     number;
    ExpLevelMax:  number;
    ExpLevelTogo: number;
    Level:        number;
    Name:         string;
}

export interface GearSet {
    Attributes: { [key: string]: number };
    ClassID:    number;
    Gear:       { [key: string]: Gear };
    GearKey:    string;
    JobID:      number;
    Level:      number;
}

export interface Gear {
    Creator: null;
    Dye:     number | null;
    ID:      number;
    Materia: number[];
    Mirage:  number | null;
}

export interface GrandCompany {
    NameID: number;
    RankID: number;
}

export interface FreeCompany {
    Active:            string;
    ActiveMemberCount: number;
    Crest:             string[];
    DC:                string;
    Estate:            Estate;
    Focus:             Focus[];
    Formed:            number;
    GrandCompany:      string;
    ID:                string;
    Name:              string;
    ParseDate:         number;
    Rank:              number;
    Ranking:           Ranking;
    Recruitment:       string;
    Reputation:        Reputation[];
    Seeking:           Focus[];
    Server:            string;
    Slogan:            string;
    Tag:               string;
}

export interface Estate {
    Greeting: string;
    Name:     string;
    Plot:     string;
}

export interface Focus {
    Icon:   string;
    Name:   string;
    Status: boolean;
}

export interface Ranking {
    Monthly: number;
    Weekly:  number;
}

export interface Reputation {
    Name:     string;
    Progress: number;
    Rank:     string;
}
export interface CharacterResponse {
    Character: Character;
    PvPTeam: PvpTeam;
  }
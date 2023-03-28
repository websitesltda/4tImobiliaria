import * as SQLite from 'expo-sqlite';
const Database = SQLite.openDatabase('db.db');

//#region Criação dos Bancos
Database.transaction((db) => {
    db.executeSql(
        `CREATE TABLE IF NOT EXISTS Vistorias (Id INTEGER PRIMARY KEY AUTOINCREMENT, Image VARCHAR(255), Tipo VARCHAR(255), Rua VARCHAR(255), Numero VARCHAR(25), Bairro VARCHAR(255), Cidade VARCHAR(255), Estado VARCHAR(255), Status BOOLEAN)`
    );
    db.executeSql(
        `CREATE TABLE IF NOT EXISTS AmbientesOptions (id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(255))`
    );
    db.executeSql(
        `CREATE TABLE IF NOT EXISTS Ambientes (Id INTEGER PRIMARY KEY AUTOINCREMENT, Vistoria VARCHAR(255), Titulo VARCHAR(255), Descricao TEXT)`
    );
    db.executeSql(
        `CREATE TABLE IF NOT EXISTS Imagens (Id INTEGER PRIMARY KEY AUTOINCREMENT, Ambiente VARCHAR(255), Image VARCHAR(500))`
    );
});
//#endregion

//#region Vistorias

async function InsertVistoria(model) {
    Database.transaction((db) => {
        db.executeSql(
            `INSERT INTO Vistorias (Id, Image, Tipo, Rua, Numero, Bairro, Cidade, Estado ) VALUES  (?,?,?,?,?,?,?,?)`,
            [model.Id, model.Image, model.Tipo, model.Rua, model.Numero, model.Bairro, model.Cidade, model.Estado]
        );
    });
};

async function UpdateVistoria(model) {
    Database.transaction((db) => {
        db.executeSql(
            `UPDATE  Vistorias SET Image = ?, Tipo = ?, Rua = ?, Numero = ?, Bairro = ?, Cidade = ?, Estado = ? WHERE Id = ?`,
            [model.Image, model.Tipo, model.Rua, model.Numero, model.Bairro, model.Cidade, model.Estado, model.Id]
        );
    });
};

async function DeleteVistoria(model) {
    Database.transaction((db) => {
        db.executeSql(
            `DELETE FROM Vistorias WHERE Id = ?`,
            [model.Id]
        );
    });
};

async function TruncateVistorias() {
    Database.transaction((db) => {
        db.executeSql(
            `DELETE FROM  Vistorias`
        );
    });
};

//#endregion

//#region InsertAmbientesOptions

async function InsertAmbientesOptions(title) {
    Database.transaction((db) => {
        db.executeSql(
            `INSERT INTO AmbientesOptions (title) VALUES  (?)`,
            [title]
        );
    });
};

async function UpdateAmbientesOptions(model) {
    Database.transaction((db) => {
        db.executeSql(
            `UPDATE  AmbientesOptions SET title = ? WHERE id = ?`,
            [model.title, model.id]
        );
    });
};

async function DeleteAmbientesOptions(model) {
    Database.transaction((db) => {
        db.executeSql(
            `DELETE FROM AmbientesOptions WHERE id = ?`,
            [model.id]
        );
    });
};

async function TruncateAmbientesOptions() {
    Database.transaction((db) => {
        db.executeSql(
            `DELETE FROM  AmbientesOptions`
        );
    });
};

//#endregion

//#region Ambientes

async function InsertAmbiente(model) {
    Database.transaction((db) => {
        db.executeSql(
            `INSERT INTO Ambientes ( Id, Vistoria, Titulo, Descricao ) VALUES  (?,?,?,?)`,
            [model.Id, model.Vistoria, model.Titulo, model.Descricao]
        );

    });

};

async function UpdateAmbiente(model) {
    Database.transaction((db) => {
        db.executeSql(
            `UPDATE Ambientes SET Titulo = ?, Descricao = ? WHERE Id = ?`,
            [model.Titulo, model.Descricao, model.Id]
        );
    });
};

async function DeleteAmbiente(model) {
    Database.transaction((db) => {
        db.executeSql(
            `DELETE FROM Ambientes WHERE Id = ?`,
            [model.Id]
        );
    });
};

async function TruncateAmbientes() {
    Database.transaction((db) => {
        db.executeSql(
            `DELETE FROM Ambientes`
        );
    });
};

//#endregion

//#region Imagens

async function InsertImagen(model) {
    Database.transaction((db) => {
        db.executeSql(
            `INSERT INTO Imagens ( Ambiente, Image ) VALUES  (?,?)`,
            [model.Ambiente, model.Image]
        );
    });
};

async function DeleteImagen(model) {
    Database.transaction((db) => {
        db.executeSql(
            `DELETE FROM Imagens WHERE Id = ?`,
            [model.Id]
        );
    });
};

async function TruncateImagens() {
    Database.transaction((db) => {
        db.executeSql(
            `DELETE FROM  Imagens`
        );
    });
};

//#endregion

export default { InsertAmbientesOptions, UpdateAmbientesOptions, DeleteAmbientesOptions, TruncateAmbientesOptions, InsertVistoria, UpdateVistoria, DeleteVistoria, TruncateVistorias, InsertAmbiente, UpdateAmbiente, DeleteAmbiente, TruncateAmbientes, InsertImagen, DeleteImagen, TruncateImagens, Database };
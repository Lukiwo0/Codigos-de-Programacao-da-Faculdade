package com.example.gestao_alunos.data

import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query

@Dao
interface AlunoDao {

    @Query("SELECT * FROM alunos ORDER BY nome ASC")
    fun getAll(): List<Aluno>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insert(aluno: Aluno)

    @Delete
    fun delete(aluno: Aluno)

    @Query("SELECT * FROM alunos WHERE media >= 5.0 ORDER BY media DESC")
    fun getAprovados(): List<Aluno>
}

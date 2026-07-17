package com.example.gestao_alunos

import  android.os.Bundle
import android.util.Log
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.example.gestao_alunos.data.Aluno
import com.example.gestao_alunos.data.AppDatabase
import com.example.gestao_alunos.databinding.ActivityMainBinding
import com.example.gestao_alunos.ui.AlunosFragment
import com.example.gestao_alunos.ui.NotasFragment

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        Log.d("MainActivity", "onCreate chamado")

        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        enableEdgeToEdge()

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, 0)
            insets
        }

        adicionarDadosBD()

        if (savedInstanceState == null) {
            supportFragmentManager.beginTransaction()
                .replace(R.id.fragment_container, AlunosFragment()).commit()
        }

        binding.bottomNavigation.setOnItemSelectedListener { item ->
            when (item.itemId) {
                R.id.nav_alunos -> {
                    supportFragmentManager.beginTransaction()
                        .replace(R.id.fragment_container, AlunosFragment()).commit()
                    true
                }

                R.id.nav_notas -> {
                    supportFragmentManager.beginTransaction()
                        .replace(R.id.fragment_container, NotasFragment()).commit()
                    true
                }

                else -> false
            }
        }

    }


    override fun onStart() {
        super.onStart()
        Log.d("MainActivity", "onStart chamado")
    }

    override fun onResume() {
        super.onResume()
        Log.d("MainActivity", "onResume chamado")
    }

    override fun onPause() {
        super.onPause()
        Log.d("MainActivity", "onPause chamado")
    }

    override fun onStop() {
        super.onStop()
        Log.d("MainActivity", "onStop chamado")
    }

    override fun onDestroy() {
        super.onDestroy()
        Log.d("MainActivity", "onDestroy chamado")
    }

    private fun adicionarDadosBD() {
        val db = AppDatabase.getDatabase(this)
        val dao = db.alunoDao()
        if (dao.getAll().isEmpty()) {
            dao.insert(Aluno(nome = "Ana Lima", matricula = "2024001", media = 8.5))
            dao.insert(Aluno(nome = "Bruno Silva", matricula = "2024002", media = 6.0))
            dao.insert(Aluno(nome = "Carla Souza", matricula = "2024003", media = 9.2))
            dao.insert(Aluno(nome = "Diego Moura", matricula = "2024004", media = 4.5))
            dao.insert(Aluno(nome = "Elisa Nunes", matricula = "2024005", media = 7.8))
            dao.insert(Aluno(nome = "Fernando Costa", matricula = "2024006", media = 5.7))
            dao.insert(Aluno(nome = "Gabriela Alves", matricula = "2024007", media = 8.9))
            dao.insert(Aluno(nome = "Henrique Rocha", matricula = "2024008", media = 6.3))
            dao.insert(Aluno(nome = "Isabela Martins", matricula = "2024009", media = 9.5))
            dao.insert(Aluno(nome = "João Pedro", matricula = "2024010", media = 2.1))
            dao.insert(Aluno(nome = "Jose Lima", matricula = "2024011", media = 7.6))
            dao.insert(Aluno(nome = "Karina Duarte", matricula = "2024012", media = 8.0))
            dao.insert(Aluno(nome = "Lucas Ferreira", matricula = "2024013", media = 4.9))
            dao.insert(Aluno(nome = "Mariana Ribeiro", matricula = "2024014", media = 1.5))
            dao.insert(Aluno(nome = "Nicolas Teixeira", matricula = "2024015", media = 6.8))
            dao.insert(Aluno(nome = "Patrícia Gomes", matricula = "2024016", media = 3.6))
        }
    }
}
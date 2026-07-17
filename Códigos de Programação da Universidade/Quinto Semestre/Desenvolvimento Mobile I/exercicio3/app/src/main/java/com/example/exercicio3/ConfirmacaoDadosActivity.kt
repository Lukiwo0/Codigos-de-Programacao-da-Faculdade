package com.example.exercicio3

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.example.exercicio3.databinding.ActivityConfirmacaoDadosBinding
import kotlin.jvm.java

class ConfirmacaoDadosActivity : AppCompatActivity() {
    private lateinit var binding: ActivityConfirmacaoDadosBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        binding = ActivityConfirmacaoDadosBinding.inflate(layoutInflater)
        setContentView(binding.root)

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        val name = intent.getStringExtra("name")
        val email = intent.getStringExtra("email")
        val age = intent.getStringExtra("age")
        val course = intent.getStringExtra("course")
        val address = intent.getStringExtra("address")

        binding.tvName.text = "Nome: $name"
        binding.tvEmail.text = "E-mail: $email"
        binding.tvAge.text = "Idade: $age"
        binding.tvCourse.text = "Curso: $course"
        binding.tvAddress.text = "Endereço: $address"

        binding.btnBack.setOnClickListener {
            finish()
        }

        binding.btnConfirm.setOnClickListener {

            if (name.isNullOrEmpty() || email.isNullOrEmpty() || age.isNullOrEmpty() || course.isNullOrEmpty() || address.isNullOrEmpty()) {
                Toast.makeText(this, "PREENCHA TODOS OS CAMPOS", Toast.LENGTH_SHORT).show()
            } else {
                val intent = Intent(this, CadastroSucessoActivity::class.java )

                intent.putExtra("name", name)
                intent.putExtra("email", email)
                intent.putExtra("age", age)
                intent.putExtra("course", course)
                intent.putExtra("address", address)

                startActivity(intent)
                finish()
            }

        }




    }
}
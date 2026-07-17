package com.example.exercicio3

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.example.exercicio3.databinding.ActivityCadastroEstudanteBinding

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityCadastroEstudanteBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        binding = ActivityCadastroEstudanteBinding.inflate(layoutInflater)
        setContentView(binding.root)


        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        binding.btnRegister.setOnClickListener {

            val name = binding.etName.text.toString().trim()
            val email = binding.etEmail.text.toString().trim()
            val age = binding.etAge.text.toString().trim()
            val course = binding.etCourse.text.toString().trim()
            val address = binding.etAddress.text.toString().trim()

            if (name.isEmpty() || email.isEmpty() || age.isEmpty() || course.isEmpty() || address.isEmpty()) {
                Toast.makeText(this, "PREENCHA TODOS OS CAMPOS", Toast.LENGTH_SHORT).show()
            } else {
                val intent = Intent(this, ConfirmacaoDadosActivity::class.java )

                intent.putExtra("name", name)
                intent.putExtra("email", email)
                intent.putExtra("age", age)
                intent.putExtra("course", course)
                intent.putExtra("address", address)

                startActivity(intent)
            }

        }

    }
}
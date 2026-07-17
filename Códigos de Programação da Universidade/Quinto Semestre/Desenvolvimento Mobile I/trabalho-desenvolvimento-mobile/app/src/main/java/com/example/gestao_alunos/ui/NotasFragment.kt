package com.example.gestao_alunos.ui

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.example.gestao_alunos.data.AppDatabase
import com.example.gestao_alunos.databinding.FragmentNotasBinding

class NotasFragment : Fragment() {

    private var _binding: FragmentNotasBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        Log.d("NotasFragment", "onCreateView chamado")
        _binding = FragmentNotasBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        exibirResumo()
    }

    override fun onResume() {
        super.onResume()
        Log.d("NotasFragment", "onResume chamado")
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    private fun exibirResumo() {
        val db = AppDatabase.getDatabase(requireContext())
        val alunos = db.alunoDao().getAll()
        val aprovados = db.alunoDao().getAprovados()

        val sb = StringBuilder()
        sb.appendLine("Total de alunos: ${alunos.size}")
        sb.appendLine("Aprovados (média ≥ 5): ${aprovados.size}")
        sb.appendLine("Reprovados: ${alunos.size - aprovados.size}")
        sb.appendLine()

        alunos.forEach { aluno ->
            val situacao = if (aluno.media >= 5.0) "Aprovado" else "Reprovado"
            sb.appendLine("${aluno.nome} - Média: ${aluno.media} ($situacao)")
        }

        binding.textResumo.text = sb.toString()
    }
}

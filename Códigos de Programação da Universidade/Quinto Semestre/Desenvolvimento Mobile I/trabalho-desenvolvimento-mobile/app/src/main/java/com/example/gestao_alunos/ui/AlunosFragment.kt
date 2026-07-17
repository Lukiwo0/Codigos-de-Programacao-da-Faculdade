package com.example.gestao_alunos.ui

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.gestao_alunos.data.AppDatabase
import com.example.gestao_alunos.databinding.FragmentAlunosBinding

class AlunosFragment : Fragment() {

    private var _binding: FragmentAlunosBinding? = null
    private val binding get() = _binding!!
    private lateinit var adapter: AlunoAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        Log.d("AlunosFragment", "onCreate chamado")
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        Log.d("AlunosFragment", "onCreateView chamado")
        _binding = FragmentAlunosBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        adapter = AlunoAdapter(emptyList())
        binding.recyclerView.layoutManager = LinearLayoutManager(requireContext())
        binding.recyclerView.adapter = adapter

        carregarAlunos()
    }

    override fun onResume() {
        super.onResume()
        Log.d("AlunosFragment", "onResume chamado")
    }

    override fun onPause() {
        super.onPause()
        Log.d("AlunosFragment", "onPause chamado")
    }

    override fun onStop() {
        super.onStop()
        Log.d("AlunosFragment", "onStop chamado")
    }

    override fun onDestroyView() {
        super.onDestroyView()
        Log.d("AlunosFragment", "onDestroyView chamado")
        _binding = null
    }

    private fun carregarAlunos() {
        val db = AppDatabase.getDatabase(requireContext())
        val alunos = db.alunoDao().getAll()
        adapter.atualizarLista(alunos)
    }
}

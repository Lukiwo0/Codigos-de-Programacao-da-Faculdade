package com.example.gestao_alunos.ui

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.gestao_alunos.data.Aluno
import com.example.gestao_alunos.databinding.ItemAlunoBinding

class AlunoAdapter(private var lista: List<Aluno>) :
    RecyclerView.Adapter<AlunoAdapter.AlunoViewHolder>() {

    class AlunoViewHolder(private val binding: ItemAlunoBinding) :
        RecyclerView.ViewHolder(binding.root) {

        fun bind(aluno: Aluno) {
            binding.textNome.text = aluno.nome
            binding.textMatricula.text = "Matrícula: ${aluno.matricula}"
            binding.textMedia.text = "Média: ${aluno.media}"
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): AlunoViewHolder {
        val binding = ItemAlunoBinding.inflate(
            LayoutInflater.from(parent.context), parent, false
        )
        return AlunoViewHolder(binding)
    }

    override fun onBindViewHolder(holder: AlunoViewHolder, position: Int) {
        holder.bind(lista[position])
    }

    override fun getItemCount(): Int = lista.size

    fun atualizarLista(novaLista: List<Aluno>) {
        lista = novaLista
        notifyDataSetChanged()
    }
}